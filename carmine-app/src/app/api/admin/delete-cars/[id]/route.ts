import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: "Car ID is required" }, { status: 400 });
  }

  try {
    // Log the received ID and query for debugging
    console.log("Attempting to delete car with ID:", params.id);

    const result = await pool.query(
      "DELETE FROM car WHERE car_id = $1 RETURNING *",
      [params.id]
    );

    console.log("Delete operation result:", result);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Car deleted successfully",
      deletedCar: result.rows[0],
    });
  } catch (error) {
    console.error("Database query error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to delete car", details: errorMessage },
      { status: 500 }
    );
  } 
}
