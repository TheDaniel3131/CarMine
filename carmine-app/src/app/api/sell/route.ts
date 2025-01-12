import { NextResponse } from "next/server";
import { Pool } from "pg";
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
    ca: fs.readFileSync("@/lib/us-east-1-bundle.pem").toString(), // Path to the root certificate
  },
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Parse JSON data instead of form data
    const data = await request.json();

    // Extract fields from JSON
    const make = data.car_make;
    const model = data.car_model;
    const year = data.car_year;
    const price = data.car_price;
    const mileage = data.car_mileage;
    const description = data.car_description;
    const imageUrl = data.car_image_url; // This will be the S3 URL
    const isRentable = data.is_rentable;

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

    // Connect to database
    const client = await pool.connect();

    try {
      // Prepare SQL query
      const query = `
        INSERT INTO car 
        (car_make, car_model, car_year, car_price, car_description, car_image, car_quantity, car_mileage, is_rentable) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING car_id;
      `;

      // Execute query
      const result = await client.query(query, [
        make,
        model,
        parsedYear,
        parsedPrice,
        description,
        imageUrl, // Store the S3 URL directly
        1, // Default quantity
        parsedMileage,
        isRentable
      ]);

      // Success response
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
      client.release(); // Always release the client
    }
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}