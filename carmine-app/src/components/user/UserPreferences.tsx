"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already set cookie preferences
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    // Here you would typically set the actual cookies based on preferences
    setOpen(false);
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    localStorage.setItem("cookie-consent", JSON.stringify(allEnabled));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By clicking
            &quot;Accept All&quot;, you consent to our use of cookies.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Necessary Cookies</span>
              <span className="font-normal text-sm text-muted-foreground">
                Required for the website to function properly. Cannot be
                disabled.
              </span>
            </Label>
            <Switch id="necessary" checked={preferences.necessary} disabled />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="functional" className="flex flex-col space-y-1">
              <span>Functional Cookies</span>
              <span className="font-normal text-sm text-muted-foreground">
                Enable personalized features and save your preferences.
              </span>
            </Label>
            <Switch
              id="functional"
              checked={preferences.functional}
              onCheckedChange={(checked: boolean) =>
                setPreferences((prev) => ({ ...prev, functional: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="analytics" className="flex flex-col space-y-1">
              <span>Analytics Cookies</span>
              <span className="font-normal text-sm text-muted-foreground">
                Help us understand how visitors interact with the website.
              </span>
            </Label>
            <Switch
              id="analytics"
              checked={preferences.analytics}
              onCheckedChange={(checked: boolean) =>
                setPreferences((prev) => ({ ...prev, analytics: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing" className="flex flex-col space-y-1">
              <span>Marketing Cookies</span>
              <span className="font-normal text-sm text-muted-foreground">
                Used to deliver personalized advertisements.
              </span>
            </Label>
            <Switch
              id="marketing"
              checked={preferences.marketing}
              onCheckedChange={(checked: boolean) =>
                setPreferences((prev) => ({ ...prev, marketing: checked }))
              }
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:space-x-2">
          <Button variant="outline" onClick={handleSave}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
