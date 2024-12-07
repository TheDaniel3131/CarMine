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
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Message = {
  id: number;
  from: string;
  subject: string;
  content: string;
  read: boolean;
};

export default function InboxPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      const userEmail = localStorage.getItem("userEmail"); // Replace with your session logic
      if (!userEmail) {
        router.push("/signin");
        return;
      }

      try {
        const response = await fetch(`/api/contact?email=${userEmail}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data: { messages: Message[] } = await response.json();
        setMessages(data.messages);
        setUnreadMessages(data.messages.filter((msg) => !msg.read).length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [router]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);

    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
      setUnreadMessages((prev) => prev - 1);

      fetch(`/api/contact/${message.id}/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).catch((error) => console.error("Failed to mark as read:", error));
    }
  };

  const handleReply = async () => {
    if (!selectedMessage) return;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          recipient: selectedMessage.from,
          subject: `Re: ${selectedMessage.subject}`,
          content: replyContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to send reply");

      alert("Reply sent successfully!");
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply. Please try again.");
    }
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
                    } hover:bg-opacity-80 rounded-lg mb-2`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>{message.from[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{message.from}</p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {message.subject}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-2/3">
            <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
              {selectedMessage ? (
                <>
                  <CardHeader>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription
                      className={darkMode ? "text-gray-300" : ""}
                    >
                      From: {selectedMessage.from}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedMessage.content}</p>
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className={`mt-4 w-full h-32 ${
                        darkMode ? "bg-gray-700 text-white" : ""
                      }`}
                    />
                  </CardContent>
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
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-64">
                  <p className={darkMode ? "text-gray-300" : "text-gray-500"}>
                    Select a message to view
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
