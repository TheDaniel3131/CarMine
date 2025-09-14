import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarMine - Revolutionize Your Car Experience",
  description:
    "Buy, sell, and rent cars with ease. Find auto parts and join a community of car enthusiasts.",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={inter.className}>{children}</div>;
}
