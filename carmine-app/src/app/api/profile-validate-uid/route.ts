// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const email = searchParams.get("email");

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });
//   }

//   // Replace this with your database logic to retrieve the userId
//   const userId = await fetch(`http://localhost:5208/api/users?email=${email}`)
//     .then((response) => response.json())
//     .then((data) => data.userId);

//   return NextResponse.json(userId);
// }

import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5433"),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
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
