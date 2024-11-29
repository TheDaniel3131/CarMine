"use client"

import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcryptjs";

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

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = `
            INSERT INTO public.user (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING user_id, username, email;
        `;
    const values = [name, email, hashedPassword];

    const result = await client.query(query, values);

    return NextResponse.json(result.rows[0]); // Return the inserted user (excluding password)
  } catch (error) {
    console.error("Error saving user:", error);
    if ((error as { code?: string }).code === "23505") {
      // Unique constraint violation (email already exists)
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
    await client.end(); // Ensure the database connection is closed
  }
}
