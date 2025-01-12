import { NextResponse } from "next/server";
// import { Client } from "pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic and not prerendered

export async function GET(request: Request) {
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
    ca: fs
      .readFileSync(
        path.join(process.cwd(), "src", "lib", "us-east-1-bundle.pem")
      )
      .toString(),
  },
});

  await pool.connect();

  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email"); // Extract email from query string

    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Query the Users table for the email, only selecting the UserId
    const result = await pool.query(
      'SELECT "UserId" FROM public."Users" WHERE "Email" = $1',
      [email] // Prevent SQL injection by using parameterized queries
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the UserId
    return NextResponse.json({ UserId: result.rows[0].UserId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}
