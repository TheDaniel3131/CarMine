import { NextResponse } from "next/server";
import { headers } from "next/headers"; // To read incoming request headers

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3100";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const make = data.car_make;
    const model = data.car_model;
    const year = data.car_year;
    const price = data.car_price;
    const mileage = data.car_mileage;
    const description = data.car_description;
    const imageUrl = data.car_image_url;
    const isRentable = data.is_rentable;

    if (!make || !model || !year || !price) {
      return NextResponse.json(
        { error: "Missing required fields: make, model, year, price" },
        { status: 400 }
      );
    }

    const parsedYear = parseInt(year, 10);
    const parsedMileage = mileage ? parseInt(mileage, 10) : 0;
    const parsedPrice = parseFloat(price);

    const currentYear = new Date().getFullYear();
    if (
      isNaN(parsedYear) ||
      parsedYear < 1900 ||
      parsedYear > currentYear + 1
    ) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const incomingHeaders = headers();
    const cookieHeader = (await incomingHeaders).get("Cookie");

    const backendHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (cookieHeader) {
      backendHeaders["Cookie"] = cookieHeader;
      console.log(
        "Forwarding Cookie header:",
        cookieHeader.substring(0, 50) + "..."
      );
    } else {
      console.warn(
        "No Cookie header found in incoming request to /api/sell. User might not be logged in."
      );
    }

    const payloadToBackend = {
      user_id: data.user_id,
      car_make: make,
      car_model: model,
      car_year: parsedYear,
      car_price: parsedPrice,
      car_mileage: parsedMileage,
      car_description: description,
      car_image_url: imageUrl,
      is_rentable: isRentable,
    };

    console.log("Sending data to backend:", JSON.stringify(payloadToBackend));
    console.log("Backend API URL:", `${API_BASE_URL}/api/sell`);

    const response = await fetch(`${API_BASE_URL}/api/sell`, {
      method: "POST",
      headers: backendHeaders, // <--- Use the headers with Authorization
      body: JSON.stringify(payloadToBackend),
      credentials: "include", // Include cookies in the request
    });

    console.log("Response Status from Backend:", response.status);
    console.log("Response OK from Backend:", response.ok);
    console.log(
      "Response Headers from Backend:",
      response.headers.get("Content-Type")
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response (raw text):", errorText);

      // Attempt to parse JSON error if Content-Type suggests it
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        try {
          const errorJson = JSON.parse(errorText);
          return NextResponse.json(
            {
              error: errorJson.title || "Failed to send car details",
              details: errorJson.errors,
            },
            { status: response.status }
          );
        } catch (jsonError) {
          console.error("Failed to parse error JSON from backend:", jsonError);
          return NextResponse.json(
            {
              error: `Backend error: ${response.status} - ${errorText.substring(
                0,
                200
              )}...`,
            },
            { status: response.status }
          );
        }
      } else {
        return NextResponse.json(
          {
            error: `Backend error: ${response.status} - ${errorText.substring(
              0,
              200
            )}...`,
          },
          { status: response.status }
        );
      }
    }
    const result = await response.json();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Unhandled error in /api/sell:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sell`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch car data" },
      { status: 500 }
    );
  }
}
