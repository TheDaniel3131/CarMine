import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeContext";
import CookieConsent from "@/components/user/UserPreferences";
import { ChatWidget } from "@/components/chat-widget/ChatWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarMine - Revolutionize Your Car Experience",
  description:
    "Buy, sell, and rent cars with ease. Find auto parts and join a community of car enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ThemeProvider>
        <AuthProvider>
          <head>
            <link
              rel="icon"
              type="image/png"
              href="/favicon-96x96.png"
              sizes="96x96"
            />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
          </head>
          <body className={inter.className} suppressHydrationWarning={true}>
            {children}
            <CookieConsent />
            <ChatWidget />
          </body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
