import { NextResponse } from "next/server";
import { Client } from "pg";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic and not prerendered

export async function GET() {
  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
  });

  await client.connect();

  try {
  const result = await client.query('SELECT * FROM public."Users"');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}