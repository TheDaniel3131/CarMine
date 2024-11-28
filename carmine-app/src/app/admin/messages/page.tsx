"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
import { Search, Trash, Eye, Reply } from "lucide-react";

import AdminHeader from "@/components/adminheader/AdminHeader";
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

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
//   const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(
    null
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState("");

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
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-4">
        <Card className="shadow-sm">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  Message Management
                </CardTitle>
                <CardDescription>
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
                  className="pl-8"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>
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
                            <Eye className="h-4 w-4" />
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
                            <Reply className="h-4 w-4" />
                            <span className="sr-only">Reply to message</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash className="h-4 w-4" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <div>{selectedMessage.name}</div>
              </div>
              <div>
                <Label>Email</Label>
                <div>{selectedMessage.email}</div>
              </div>
              <div>
                <Label>Subject</Label>
                <div>{selectedMessage.subject}</div>
              </div>
              <div>
                <Label>Message</Label>
                <div className="whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <div>
                <Label>Date</Label>
                <div>
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Message Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
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
                  <Label>To</Label>
                  <div>
                    {selectedMessage.name} ({selectedMessage.email})
                  </div>
                </div>
                <div>
                  <Label>Subject</Label>
                  <div>Re: {selectedMessage.subject}</div>
                </div>
                <div>
                  <Label htmlFor="reply">Your Reply</Label>
                  <Textarea
                    id="reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Send Reply</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
