import { NextResponse } from "next/server";
// import { Client } from "pg";
import { Pool } from "pg";
import fs from "fs";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic and not prerendered

// Create a connection pool
export async function GET() {
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

  await pool.connect();

  try {
  const result = await pool.query('SELECT * FROM public."Users"');
    return NextResponse.json(result.rows);
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