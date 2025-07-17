import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.API_BASE_URL || "https://your-api-url.com";

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
        { error: "Missing required fields" },
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

    const apiResponse = await fetch(`${API_BASE_URL}/api/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        car_make: make,
        car_model: model,
        car_year: parsedYear,
        car_price: parsedPrice,
        car_mileage: parsedMileage,
        car_description: description,
        car_image_url: imageUrl,
        is_rentable: isRentable,
      }),
    });

    const result = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: result.error || "Failed to send car details" },
        { status: apiResponse.status }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Unhandled error:", error);
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
