import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5208";

interface ContactMessage {
  id: number;
  name: string | null;
  email: string;
  content: string;
  submittedAt: string;
  replied: boolean;
  replies: AdminReply[];
}

interface AdminReply {
  id: number;
  replyContent: string;
  repliedAt: string;
  contactMessageId: number;
}

interface TransformedMessage {
  id: string;
  from: string;
  content: string;
  submittedAt: string;
  read: boolean;
  isAdminReply: boolean;
  originalMessageId?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/user/${email}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ContactMessage[];

    // Transform the data into the expected format
    const messages: TransformedMessage[] = data.flatMap((msg) => {
      // Create an array with the original message
      const messageArray: TransformedMessage[] = [
        {
          id: msg.id.toString(),
          from: msg.name || email,
          content: msg.content,
          submittedAt: msg.submittedAt,
          read: false,
          isAdminReply: false,
        },
      ];

      // Add any replies for this message
      if (msg.replies && msg.replies.length > 0) {
        msg.replies.forEach((reply) => {
          messageArray.push({
            id: `reply-${reply.id}`,
            from: "Admin",
            content: reply.replyContent,
            submittedAt: reply.repliedAt,
            read: false,
            isAdminReply: true,
            originalMessageId: reply.contactMessageId.toString(),
          });
        });
      }

      return messageArray;
    });

    // Sort all messages by date
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return NextResponse.json({ messages: sortedMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
