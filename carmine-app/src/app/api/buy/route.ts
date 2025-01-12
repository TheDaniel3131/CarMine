import { NextResponse } from "next/server";
import { Pool } from "pg";

// Reuse the connection pool across function invocations
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
  },
});

export const dynamic = "force-dynamic"; // Ensure route runs dynamically

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT car_id, car_make, car_model, car_year, car_mileage, car_price, car_description, car_quantity, car_image, is_rentable
      FROM car;
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch car data" },
      { status: 500 }
    );
  }
}
