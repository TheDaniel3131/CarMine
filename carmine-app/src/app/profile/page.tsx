"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car, Calendar, DollarSign, Loader2, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CarRecord {
  id: string;
  model: string;
  type: "rental" | "purchase";
  date: string;
  price: number;
  status: "active" | "completed" | "upcoming";
}

export default function CarRecordTracker() {
  const [filter, setFilter] = useState<"all" | "rental" | "purchase">("all");
  const [carRecords, setCarRecords] = useState<CarRecord[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadMessages] = useState(2);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    async function fetchUserIdAndRecords() {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.error("User email not found in localStorage.");
        return;
      }

      try {
        // Fetch userId using the validate-uid API
        const userIdResponse = await fetch(
          `/api/validate-uid?userEmail=${userEmail}`
        );
        const userIdData = await userIdResponse.json();

        if (!userIdData.success) {
          console.error("Error fetching userId:", userIdData.message);
          return;
        }

        const userId = userIdData.userId;

        // Fetch car records for the retrieved userId
        const recordsResponse = await fetch(`/api/profile/${userId}`);
        const records = await recordsResponse.json();
        setCarRecords(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserIdAndRecords();
  }, []);

  const filteredRecords = carRecords.filter((record) =>
    filter === "all" ? true : record.type === filter
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-800" : "bg-gray-100"
      }`}
    >
      {" "}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={unreadMessages}
      />
      <main className="container mx-auto p-4 max-w-6xl mb-16 px-4 py-10 md:py-12 dark:bg-gray-800 dark:text-gray-100">
        <div className="mb-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home Page
          </button>
        </div>
        <Card className="dark:bg-gray-900 border dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="dark:text-gray-100">
              Your Car Records
            </CardTitle>
            <Select
              onValueChange={(value: "all" | "rental" | "purchase") =>
                setFilter(value)
              }
            >
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="rental">Rentals</SelectItem>
                <SelectItem value="purchase">Purchases</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredRecords.map((record) => (
                <Card
                  key={record.id}
                  className="p-4 dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg"
                >
                  <CardContent>
                    <h3 className="font-semibold mb-2 flex items-center text-lg dark:text-gray-100">
                      <Car className="mr-2 h-5 w-5" />
                      {record.model}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {record.date}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        {record.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                      <div>Type: {record.type}</div>
                      <div>Status: {record.status}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
