import { NextResponse } from "next/server";
import { Client } from "pg";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic and not prerendered

export async function GET(request: Request) {
  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
  });

  await client.connect();

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
    const result = await client.query(
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
    await client.end();
  }
}
