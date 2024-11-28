"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Search, Edit, Trash } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/ThemeContext";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: "available" | "sold" | "maintenance";
}

export default function AdminCarsPage() {
  const router = useRouter();
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const { darkMode } = useTheme();

  React.useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      // In a real application, this would be an API call
      const dummyCars: Car[] = [
        {
          id: "1",
          make: "Toyota",
          model: "Camry",
          year: 2022,
          price: 25000,
          status: "available",
        },
        {
          id: "2",
          make: "Honda",
          model: "Civic",
          year: 2023,
          price: 22000,
          status: "sold",
        },
        {
          id: "3",
          make: "Ford",
          model: "F-150",
          year: 2021,
          price: 35000,
          status: "maintenance",
        },
        {
          id: "4",
          make: "Tesla",
          model: "Model 3",
          year: 2023,
          price: 45000,
          status: "available",
        },
        {
          id: "5",
          make: "Chevrolet",
          model: "Malibu",
          year: 2022,
          price: 23000,
          status: "available",
        },
      ];
      setCars(dummyCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        // In a real application, this would be an API call
        setCars(cars.filter((car) => car.id !== id));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.year.toString().includes(search)
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
                  Car Management
                </CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  Manage your car inventory
                </CardDescription>
              </div>
              <Button
                onClick={() => router.push("/admin/cars/new")}
                className={
                  darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Car
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cars..."
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
                      Make
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Model
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Year
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Price
                    </TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>
                      Status
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
                      <TableCell colSpan={6} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredCars.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No cars found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCars.map((car) => (
                      <TableRow
                        key={car.id}
                        className={
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }
                      >
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {car.make}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {car.model}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          {car.year}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          ${car.price.toLocaleString()}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              car.status === "available"
                                ? "bg-green-200 text-green-800"
                                : car.status === "sold"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {car.status.charAt(0).toUpperCase() +
                              car.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/admin/cars/${car.id}`)}
                          >
                            <Edit
                              className={`h-4 w-4 ${
                                darkMode ? "text-gray-300" : ""
                              }`}
                            />
                            <span className="sr-only">Edit car</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteCar(car.id)}
                          >
                            <Trash
                              className={`h-4 w-4 ${
                                darkMode ? "text-gray-300" : ""
                              }`}
                            />
                            <span className="sr-only">Delete car</span>
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
    </div>
  );
}
