"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
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
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  // const router = useRouter();
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
    try {
      // In a real application, this would be an API call
      const dummyMessages: Message[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          subject: "Inquiry about SUVs",
          message:
            "I am interested in your SUV models. Can you provide more information about available options and pricing?",
          createdAt: "2023-06-01T10:00:00Z",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          subject: "Feedback on service",
          message:
            "I wanted to share my experience with your service department. The staff was very professional and helpful.",
          createdAt: "2023-06-02T14:30:00Z",
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          subject: "Test drive request",
          message:
            "I would like to schedule a test drive for the new sedan model you have. What are the available time slots?",
          createdAt: "2023-06-03T09:15:00Z",
        },
      ];
      setMessages(dummyMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // In a real application, this would be an API call
        setMessages(messages.filter((message) => message.id !== id));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const sendReply = async (messageId: string, replyContent: string) => {
    try {
      // In a real application, this would be an API call to send the reply
      console.log(`Sending reply to message ${messageId}: ${replyContent}`);
      // You might want to update the message status or add the reply to the message object
      setIsReplyDialogOpen(false);
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(search.toLowerCase()) ||
      message.email.toLowerCase().includes(search.toLowerCase()) ||
      message.subject.toLowerCase().includes(search.toLowerCase())
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
                  Message Management
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
                  <TableRow
                    className={
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }
                  >
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Name
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Email
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Subject
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Date
                    </TableHead>
                    <TableHead
                      className={`text-right ${
                        darkMode ? "text-gray-300" : ""
                      }`}
                    >
                      Actions
                    </TableHead>
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
                      <TableRow
                        key={message.id}
                        className={
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }
                      >
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {message.name}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {message.email}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {message.subject}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {new Date(message.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedMessage(message);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye
                              className={`h-4 w-4 ${
                                darkMode ? "text-gray-300" : ""
                              }`}
                            />
                            <span className="sr-only">View message</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedMessage(message);
                              setIsReplyDialogOpen(true);
                            }}
                          >
                            <Reply
                              className={`h-4 w-4 ${
                                darkMode ? "text-gray-300" : ""
                              }`}
                            />
                            <span className="sr-only">Reply to message</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash
                              className={`h-4 w-4 ${
                                darkMode ? "text-gray-300" : ""
                              }`}
                            />
                            <span className="sr-only">Delete message</span>
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
                  Subject
                </Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedMessage.subject}
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
                  {new Date(selectedMessage.createdAt).toLocaleString()}
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
                  <Label className={darkMode ? "text-gray-300" : ""}>
                    Subject
                  </Label>
                  <div className={darkMode ? "text-gray-100" : ""}>
                    Re: {selectedMessage.subject}
                  </div>
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
