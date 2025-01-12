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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userEmail = url.searchParams.get("userEmail");

  if (!userEmail) {
    return NextResponse.json(
      { success: false, message: "User email is required" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      'SELECT "UserId" FROM "Users" WHERE "Email" = $1',
      [userEmail]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, userId: result.rows[0].UserId });
  } catch (error) {
    console.error("Error fetching userId:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
