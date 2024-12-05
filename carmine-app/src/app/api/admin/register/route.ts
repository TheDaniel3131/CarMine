import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure the route is dynamic

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  // Log the received data to verify
  console.log("Received data:", { username, email, password });

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("http://localhost:5208/api/auth/adminregister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
