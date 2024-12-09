"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AH from "@/components/adminheader/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/ThemeContext";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: "available" | "sold" | "maintenance";
}

export default function AdminCarPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [car, setCar] = React.useState<Car | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (params.id !== "new") {
      fetchCar(params.id);
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchCar = async (id: string) => {
    try {
      // In a real application, this would be an API call
      const dummyCar: Car = {
        id: id,
        make: "Toyota",
        model: "Camry",
        year: 2022,
        price: 25000,
        status: "available",
      };
      setCar(dummyCar);
    } catch (error) {
      console.error("Error fetching car:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const carData = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: parseInt(formData.get("year") as string),
      price: parseInt(formData.get("price") as string),
      status: formData.get("status") as "available" | "sold" | "maintenance",
    };

    try {
      if (params.id === "new") {
        // In a real application, this would be an API call to create a new car
        console.log("Creating new car:", carData);
      } else {
        // In a real application, this would be an API call to update the car
        console.log("Updating car:", { id: params.id, ...carData });
      }
      router.push("/admin/cars");
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  if (loading) {
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
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        </main>
      </div>
    );
  }

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
                  {params.id === "new" ? "Add New Car" : "Edit Car"}
                </CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  {params.id === "new"
                    ? "Add a new car to your inventory"
                    : "Edit car details"}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/accessed/cars?authenticated=true")}
                className={
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                    : "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                }
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cars
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="make"
                    className={darkMode ? "text-gray-300" : ""}
                  >
                    Make
                  </Label>
                  <Input
                    id="make"
                    name="make"
                    defaultValue={car?.make}
                    required
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="model"
                    className={darkMode ? "text-gray-300" : ""}
                  >
                    Model
                  </Label>
                  <Input
                    id="model"
                    name="model"
                    defaultValue={car?.model}
                    required
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="year"
                    className={darkMode ? "text-gray-300" : ""}
                  >
                    Year
                  </Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    defaultValue={car?.year}
                    required
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className={darkMode ? "text-gray-300" : ""}
                  >
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={car?.price}
                    required
                    min={0}
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className={darkMode ? "text-gray-300" : ""}
                >
                  Status
                </Label>
                <Select name="status" defaultValue={car?.status || "available"}>
                  <SelectTrigger
                    className={
                      darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                    }
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className={`w-full ${
                  darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                }`}
              >
                {params.id === "new" ? "Add Car" : "Update Car"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
