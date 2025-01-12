import { NextResponse } from "next/server";
import { Pool } from "pg";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import fs from "fs";

// Create a connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"), // Default PostgreSQL port
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 10, // Limit pool size for serverless
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Fail if connection takes longer than 2s
  ssl: {
    rejectUnauthorized: false, // For self-signed certificates; set to true for production
    ca: fs.readFileSync("@/lib/us-east-1bundle.pem").toString(), // Path to the root certificate
  },
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    // Extract form fields
    const make = formData.get('car_make')?.toString() || "";
    const model = formData.get('car_model')?.toString() || "";
    const year = formData.get('car_year')?.toString() || "";
    const price = formData.get('car_price')?.toString() || "";
    const mileage = formData.get('car_mileage')?.toString() || "";
    const description = formData.get('car_description')?.toString() || "";
    const image = formData.get('car_image') as File | null;
    const isRentable = formData.get('is_rentable') === "true"; // Parse as boolean

    // Validation
    if (!make || !model || !year || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse numeric fields
    const parsedYear = parseInt(year, 10);
    const parsedMileage = mileage ? parseInt(mileage, 10) : 0;
    const parsedPrice = parseFloat(price);

    // Validate year
    const currentYear = new Date().getFullYear();
    if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > currentYear + 1) {
      return NextResponse.json(
        { error: "Invalid year" },
        { status: 400 }
      );
    }

    // Validate price
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: "Invalid price" },
        { status: 400 }
      );
    }

    // Handle image upload
    let imageUrl: string | null = null;
    if (image && image.size > 0) {
      try {
        const uniqueFileName = `${uuidv4()}-${image.name.replace(/\s/g, '_')}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        const fullPath = path.join(uploadDir, uniqueFileName);
        await writeFile(fullPath, buffer);

        imageUrl = `/uploads/${uniqueFileName}`;
      } catch (fileError) {
        console.error("Image upload error:", fileError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Connect to the database and insert data
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO car 
        (car_make, car_model, car_year, car_price, car_description, car_image, car_quantity, car_mileage, is_rentable) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING car_id;
      `;
      const result = await client.query(query, [
        make,
        model,
        parsedYear,
        parsedPrice,
        description,
        imageUrl,
        1, 
        parsedMileage,
        isRentable
      ]);

      return NextResponse.json(
        {
          message: "Car added successfully",
          carId: result.rows[0]?.car_id
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database insertion error:", dbError);
      return NextResponse.json(
        { error: "Failed to insert car details" },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
