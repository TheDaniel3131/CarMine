"use client"

import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
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

    // Query the user by email
    const query = `
      SELECT user_id, username, email, password 
      FROM public.user 
      WHERE email = $1;
    `;
    const values = [email];
    const result = await client.query(query, values);

    // Check if user exists
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a mock session or token (replace with real session/token logic)
    const sessionData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return NextResponse.json(sessionData); // Respond with user info or token
  } catch (error) {
    console.error("Error during signin:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
