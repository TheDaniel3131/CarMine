"use client";

import * as React from "react";
import { Search, Trash, Eye, Reply } from "lucide-react";
import AH from "@/components/adminheader/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/ThemeContext";

interface Message {
  id: string;
  name: string;
  email: string;
  // subject: string;
  message: string;
  submittedAt: string;
  replied: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(
    null
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState("");
  const { darkMode } = useTheme();

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/contact");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/admin/contact/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log("Delete response:", {
          status: response.status,
          text: responseText,
        });

        // Try to parse the response as JSON if it's not empty
        let result;
        try {
          result = responseText ? JSON.parse(responseText) : { success: true };
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          throw new Error("Invalid response from server");
        }

        if (response.ok) {
          setMessages(messages.filter((message) => message.id !== id));
          return;
        } else {
          throw new Error(result.message || `Server error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        alert(
          error instanceof Error
            ? `Error: ${error.message}`
            : "Failed to delete message. Please try again."
        );
      }
    }
  };

  const sendReply = async (messageId: string, replyContent: string) => {
    try {
      const response = await fetch("/api/admin/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reply", messageId, replyContent }),
      });
      if (!response.ok) throw new Error("Failed to send reply");
      setIsReplyDialogOpen(false);
      setReplyContent("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.email.toLowerCase().includes(search.toLowerCase()) ||
      message.message.toLowerCase().includes(search.toLowerCase()) || 
      new Date(message.submittedAt).toLocaleDateString().includes(search) ||
      (message.replied ? "Replied" : "Pending").toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <AH />
      <main className="flex-grow container mx-auto px-4 py-4">
        <Card
          className={`shadow-sm ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
          }`}
        >
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  Contact Message Management
                </CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  View and respond to contact form messages
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`pl-8 ${
                    darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
            <div
              className={`rounded-md border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Name</TableHead>
                    <TableHead className="w-1/4">Email</TableHead>
                    <TableHead className="w-1/5">Date</TableHead>
                    <TableHead className="w-1/6">Status</TableHead>
                    <TableHead className="w-1/6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No messages found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">
                          {message.name}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>
                          {new Date(message.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              message.replied
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {message.replied ? "Replied" : "Pending"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedMessage(message);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedMessage(message);
                              setIsReplyDialogOpen(true);
                            }}
                            disabled={message.replied}
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className={darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}
        >
          <DialogHeader>
            <DialogTitle>View Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>Name</Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedMessage.name}
                </div>
              </div>
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>Email</Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedMessage.email}
                </div>
              </div>
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>
                  Message
                </Label>
                <div
                  className={`whitespace-pre-wrap ${
                    darkMode ? "text-gray-100" : ""
                  }`}
                >
                  {selectedMessage.message}
                </div>
              </div>
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>Date</Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {new Date(selectedMessage.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Message Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent
          className={darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}
        >
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendReply(selectedMessage.id, replyContent);
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label className={darkMode ? "text-gray-300" : ""}>To</Label>
                  <div className={darkMode ? "text-gray-100" : ""}>
                    {selectedMessage.name} ({selectedMessage.email})
                  </div>
                </div>
                <div>
                  {/* <Label className={darkMode ? "text-gray-300" : ""}>
                    Subject
                  </Label>
                  <div className={darkMode ? "text-gray-100" : ""}>
                    Re: {selectedMessage.subject}
                  </div> */}
                </div>
                <div>
                  <Label
                    htmlFor="reply"
                    className={`mb-4 block ${darkMode ? "text-gray-300" : ""}`}
                  >
                    Your Reply
                  </Label>
                  <Textarea
                    id="reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={5}
                    required
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  className={
                    darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : ""
                  }
                >
                  Send Reply
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
