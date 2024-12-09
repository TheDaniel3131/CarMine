"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Message = {
  id: number | string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  replied: boolean;
  read: boolean;
  isAdminReply?: boolean;
  originalMessageId?: number;
  content: string;
  from: string;
  replies?: Array<{
    id: number;
    replyContent: string;
    repliedAt: string;
  }>;
};

export default function InboxPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by retrieving email from localStorage
    const userEmail = localStorage.getItem("userEmail");
    console.log("Retrieved email:", userEmail); // Log for debugging

    if (!userEmail) {
      // Redirect to signin page if no userEmail found
      router.push("/signin");
      return;
    }

    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      if (email) {
        setUserEmail(email);
      } else {
        router.push("/signin");
      }
    }

    // Fetch messages only if user is logged in
    const fetchMessages = async () => {
      try {
        console.log(`/api/inbox?email=${userEmail}`); // Debugging
        const response = await fetch(`/api/inbox?email=${userEmail}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data: { messages: Message[] } = await response.json();

        // Sort messages by date, newest first
        const sortedMessages = data.messages.sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
        );

        setMessages(sortedMessages);
        setUnreadMessages(sortedMessages.filter((msg) => !msg.read).length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [router]);

  useEffect(() => {
    if (userEmail) {
      console.log(`Welcome, ${userEmail}`);
    }
  }, [userEmail]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getRelatedMessages = (messageId: string | number) => {
    const originalMessage = messages.find((m) => m.id === messageId);
    if (!originalMessage) return []; // Return empty array if no message found

    return messages
      .filter(
        (m) =>
          m.id === messageId ||
          m.originalMessageId === messageId ||
          (originalMessage.originalMessageId &&
            m.id === originalMessage.originalMessageId)
      )
      .sort(
        (a, b) =>
          new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
      );
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);

    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
      setUnreadMessages((prev) => prev - 1);

      try {
        await fetch(`/api/inbox/${message.id}/read`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleReply = async () => {
    if (!selectedMessage) return;

    try {
      const response = await fetch("/api/admin/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          recipient: selectedMessage.from,
          content: replyContent,
          originalMessageId: selectedMessage.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to send reply");

      alert("Reply sent successfully!");
      setReplyContent("");

      // Refresh messages to show the new reply
      const userEmail = localStorage.getItem("userEmail");
      const updatedResponse = await fetch(`/api/inbox?email=${userEmail}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (updatedResponse.ok) {
        const data = await updatedResponse.json();
        setMessages(
          data.messages.sort(
            (a: Message, b: Message) =>
              new Date(b.submittedAt).getTime() -
              new Date(a.submittedAt).getTime()
          )
        );
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply. Please try again.");
    }
  };

  const getMessageIcon = (message: Message) => {
    if (message.isAdminReply) {
      return "A"; // Admin icon
    }
    return message.from[0].toUpperCase();
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={unreadMessages}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Inbox</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription className={darkMode ? "text-gray-300" : ""}>
                  {unreadMessages} unread
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-center justify-between p-2 cursor-pointer ${
                      message.read
                        ? darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                        : darkMode
                        ? "bg-gray-600 font-bold"
                        : "bg-white font-bold"
                    } ${
                      message.isAdminReply ? "border-l-4 border-blue-500" : ""
                    } hover:bg-opacity-80 rounded-lg mb-2`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar
                        className={message.isAdminReply ? "bg-blue-500" : ""}
                      >
                        <AvatarFallback>
                          {getMessageIcon(message)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {message.isAdminReply ? "Admin Reply" : message.from}
                        </p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        >
                          {new Date(message.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {message.isAdminReply && (
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-2/3">
            <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
              {selectedMessage ? (
                <>
                  {getRelatedMessages(selectedMessage.id).map(
                    (message, index) => (
                      <div key={message.id}>
                        <CardHeader className={index > 0 ? "border-t" : ""}>
                          <CardDescription
                            className={darkMode ? "text-gray-300" : ""}
                          >
                            From:{" "}
                            {message.isAdminReply ? "Admin" : message.from}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{message.content}</p>
                        </CardContent>
                      </div>
                    )
                  )}
                  <CardContent>
                    <p>{selectedMessage.content}</p>
                    {!selectedMessage.isAdminReply && (
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className={`mt-4 w-full h-32 ${
                          darkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      />
                    )}
                  </CardContent>
                  {!selectedMessage.isAdminReply && (
                    <CardFooter>
                      <Button
                        onClick={handleReply}
                        className={
                          darkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                        }
                      >
                        <Send className="mr-2 h-4 w-4" /> Send Reply
                      </Button>
                    </CardFooter>
                  )}
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-64">
                  <p className={darkMode ? "text-gray-300" : "text-gray-500"}>
                    Select a message to view details
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}
