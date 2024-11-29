"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BuyPage() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={0}
      />

      <main className="container mx-auto px-4 py-20 md:py-24">
        <h1
          className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${
            darkMode
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
          }`}
        >
          Find Your Dream Car
        </h1>

        <div className="max-w-4xl mx-auto mb-16">
          <div
            className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-lg`}
          >
            <Input
              type="text"
              placeholder="Search by make, model, or keyword"
              className={`flex-grow ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            />
            <Select>
              <SelectTrigger
                className={`w-full md:w-[180px] ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10000">$0 - $10,000</SelectItem>
                <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
                <SelectItem value="30000+">$30,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className={`w-full md:w-auto ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl overflow-hidden shadow-lg`}
            >
              <Image
                src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-${
                  (i % 3) + 1
                }-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg`}
                alt={`Car ${i}`}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  2023 Model Y
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  Electric SUV with advanced features and long range.
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-2xl font-bold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    $55,000
                  </span>
                  <Button
                    size="sm"
                    className={`${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className={`${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold px-8 py-4 text-lg`}
          >
            Load More <ChevronDown className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
