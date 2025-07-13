// components/chat-widget/ContactWidget.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { MessageCircle, X, Send, CheckCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk for auth

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useUser();

  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    message: "",
  });

  // const categories = [
  //   { value: "general", label: "General Inquiry" },
  //   { value: "technical", label: "Technical Support" },
  //   { value: "billing", label: "Billing & Payments" },
  //   { value: "feature", label: "Feature Request" },
  //   { value: "bug", label: "Bug Report" },
  //   { value: "partnership", label: "Partnership" },
  // ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // Submit to your API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after success
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: user?.fullName || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            message: "",
          });
        }, 3000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      // Handle error (you might want to show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeContact = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <>
      {/* Floating contact button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-50 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        title="Contact Support"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Contact form window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[400px] max-h-[500px] flex flex-col z-50 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
            <div>
              <h3 className="font-semibold text-lg">Contact CarMine</h3>
              <p className="text-sm text-muted-foreground">
                {user ? `Hi ${user.firstName}!` : "We're here to help"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={closeContact}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-4 flex-1 overflow-y-auto">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h4 className="text-lg font-semibold">Message Sent!</h4>
                <p className="text-sm text-muted-foreground">
                  Thank you for contacting us. We&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={!!user?.primaryEmailAddress?.emailAddress}
                  />
                  {user?.primaryEmailAddress?.emailAddress && (
                    <p className="text-xs text-muted-foreground">
                      Using your account email
                    </p>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="Brief description of your inquiry"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Describe your question or issue in detail..."
                    className="min-h-[100px] resize-none"
                    required
                  />
                </div>
              </form>
            )}
          </CardContent>

          {!isSubmitted && (
            <CardFooter className="p-4 pt-2 border-t">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </>
  );
}
