import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5208";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if required
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const messages = await response.json();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages.", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (data.action === "reply") {
      const { messageId, replyContent } = data;

      // Send reply request to ASP.NET backend
      const replyResponse = await fetch(`${API_BASE_URL}/api/contact/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any authentication headers if required
        },
        body: JSON.stringify({
          messageId,
          replyContent,
        }),
      });

      if (!replyResponse.ok) {
        throw new Error(`HTTP error! status: ${replyResponse.status}`);
      }

      const result = await replyResponse.json();
      return NextResponse.json(result);
    } else {
      // Handle new message submission
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any authentication headers if required
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const id = req.url.split("/").pop();
    const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete message." },
      { status: 500 }
    );
  }
}
