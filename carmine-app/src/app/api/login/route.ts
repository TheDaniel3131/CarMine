import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5208";

// export const dynamic = "force-dynamic"; // Ensure the route is dynamic

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Forward the request to the ASP.NET Core Web API (localhost:5208)
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle responses from the ASP.NET Core Web API
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the response from ASP.NET Core back to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
