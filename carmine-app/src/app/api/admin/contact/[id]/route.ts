import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5208";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Convert the id to a number
    const numericId = parseInt(id, 10);

    // Validate that the ID is a valid number
    if (isNaN(numericId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid ID format",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/contact/${numericId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    // Handle successful deletion
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
