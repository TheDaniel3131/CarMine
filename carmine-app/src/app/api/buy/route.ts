import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export const dynamic = "force-dynamic"; // Ensure dynamic route handling

export async function GET() {
  try {
    const client = await pool.connect();
    const query = `SELECT car_id, car_make, car_model, car_year, car_mileage, car_price, car_description, car_quantity, car_image, is_rentable FROM car;`;
    const result = await client.query(query);
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch car data" },
      { status: 500 }
    );
  }
}
