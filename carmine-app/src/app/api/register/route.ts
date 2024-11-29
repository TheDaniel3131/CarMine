import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
  });

  try {
    await client.connect();

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO public.user (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING user_id, username, email;
    `;
    const values = [name, email, hashedPassword];

    const result = await client.query(query, values);

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error saving user:", error);
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
