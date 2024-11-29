import { NextResponse } from "next/server";
import { Client } from "pg";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic

export async function POST(req: Request) {
  const { email, password } = await req.json();

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

    const query = `
      SELECT user_id, username, email, password 
      FROM public.user 
      WHERE email = $1;
    `;
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const sessionData = {
      id: user.user_id,
      username: user.username,
      email: user.email,
    };

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
