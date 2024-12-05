import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeContext";
import "../globals.css";

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
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <body className={inter.className}>{children}</body>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
