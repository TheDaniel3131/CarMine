import { NextResponse } from "next/server";
import { validateAdmin } from "@/lib/auth"; // Local database validation helper

export const dynamic = "force-dynamic"; // Ensure dynamic routing

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
    // Step 1: Local validation using validateAdmin
    const isValidAdmin = await validateAdmin(email, password);

    if (!isValidAdmin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Step 2: Forward the request to the ASP.NET Core Web API
    const response = await fetch("http://localhost:5208/api/auth/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Step 3: Handle the response from the ASP.NET Core API
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "External login failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Success: Return the response from the ASP.NET Core API to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
