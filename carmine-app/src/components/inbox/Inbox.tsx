"use client";

import { useState, useEffect } from "react";
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
import { Send, Trash2, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InboxPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "John Doe",
      subject: "Welcome to CarMine!",
      content: "Thank you for joining CarMine. We hope you enjoy our services.",
      read: false,
      starred: false,
    },
    {
      id: 2,
      from: "Jane Smith",
      subject: "New Car Listing",
      content:
        "A new car matching your preferences has been listed. Check it out!",
      read: false,
      starred: false,
    },
    {
      id: 3,
      from: "Support Team",
      subject: "Your Recent Inquiry",
      content:
        "We have received your inquiry and will get back to you shortly.",
      read: true,
      starred: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<null | { id: number; from: string; subject: string; content: string; read: boolean; starred: boolean }>(null);
  const [replyContent, setReplyContent] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(2);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMessageClick = (message: { id: number; from: string; subject: string; content: string; read: boolean; starred: boolean }) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(
        messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
      setUnreadMessages((prev) => prev - 1);
    }
  };

  const handleStarMessage = (id: number) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleReply = () => {
    // Here you would typically send the reply to a server
    if (selectedMessage) {
      console.log(`Replying to ${selectedMessage.from}: ${replyContent}`);
      setReplyContent("");
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
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarMessage(message.id);
                        }}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            message.starred
                              ? "text-yellow-400 fill-yellow-400"
                              : darkMode
                              ? "text-gray-300"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
                      >
                        <Trash2
                          className={`h-4 w-4 ${
                            darkMode ? "text-gray-300" : "text-gray-400"
                          }`}
                        />
                      </Button>
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
                    <div className="mt-6">
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className={`w-full h-32 ${
                          darkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      />
                    </div>
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
