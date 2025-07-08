import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    console.log("Received data:", { username, email, password });

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
      }),
    });

    // Add more detailed error handling
    if (!response.ok) {
      // Try to get error text if JSON parsing fails
      const errorText = await response.text();
      console.error("Error response:", errorText);

      return NextResponse.json(
        { message: "Registration failed", details: errorText },
        { status: response.status }
      );
    }

    // Safely parse JSON
    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    // Log the full error for debugging
    console.error("Detailed registration error:", error);

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          message: "Invalid response from server", 
          errorDetails: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}