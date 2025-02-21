import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];

  // Combine system prompt with user messages
  const systemMessage = {
    role: "user",
    content: `[System Role] You are CarMine's helpful customer support AI assistant. 
                You help users with questions about buying and selling cars on CarMine marketplace.
                
                Key information about CarMine:
                - CarMine is a trusted car marketplace for buying and selling vehicles
                - We charge 2% fee for successful sales
                - We offer secure payments and escrow services
                - Users can schedule inspections before buying
                - We verify all sellers and listings
                
                If you don't know something, direct users to contact human support at support@carmine.com
                Keep responses friendly but professional and concise.
                
                [Current Conversation]
                ${messages
                  .map(
                    (m: { role: string; content: string }) =>
                      `${m.role}: ${m.content}`
                  )
                  .join("\n")}`,
  };

  // Use Google's streamText API
  const { textStream } = await streamText({
    model: google("gemini-1.5-pro"),
    prompt: systemMessage.content + "\n" + lastMessage.content,
    temperature: 0.7,
    maxTokens: 500,
  });

  // Stream the response back to the client
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const textPart of textStream) {
        controller.enqueue(encoder.encode(textPart));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
