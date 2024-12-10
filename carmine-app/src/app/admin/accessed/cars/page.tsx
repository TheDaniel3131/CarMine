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
  car_id: string;
  car_make: string;
  car_model: string;
  car_year: number;
  car_price: number;
  is_rentable: boolean;
}

export default function AdminCarsPage() {
  const router = useRouter();
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const { darkMode } = useTheme();

  // Fetch car data from the buy/route.ts API
  const fetchCars = async () => {
    try {
      const response = await fetch("/api/buy"); // Ensure this matches your API route path
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCars();
  }, []);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";

    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/admin/signin");
      } else {
        setIsLoading(false); // Stop showing the loading screen
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Add your loading spinner or animation here */}
      </div>
    );
  }

  const deleteCar = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        setCars(cars.filter((car) => car.car_id !== id));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.car_make.toLowerCase().includes(search.toLowerCase()) ||
      car.car_model.toLowerCase().includes(search.toLowerCase()) ||
      car.car_year.toString().includes(search) ||
      car.car_price.toString().includes(search) ||
      (search.toString().toLowerCase().includes('rentable') && car.is_rentable === true) ||
      (search.toString().toLowerCase().includes('non-rentable') && car.is_rentable === false)
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
                <CardTitle className="text-xl font-bold">Car Management</CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  Manage your car inventory
                </CardDescription>
              </div>
              <Button
                onClick={() => router.push("/admin/accessed/cars/new?authenticated=true")}
                className={darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
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
                  className={`pl-8 ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"}`}
                />
              </div>
            </div>
            <div className={`rounded-md border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <Table>
                <TableHeader>
                  <TableRow
                    className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                  >
                    <TableHead className={darkMode ? "text-gray-300" : ""}>Make</TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>Model</TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>Year</TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>Price</TableHead>
                    <TableHead className={darkMode ? "text-gray-300" : ""}>Status</TableHead>
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
                        key={car.car_id}
                        className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                      >
                        <TableCell className={darkMode ? "text-gray-300" : ""}>{car.car_make}</TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>{car.car_model}</TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>{car.car_year}</TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          ${car.car_price.toLocaleString()}
                        </TableCell>
                        <TableCell className={darkMode ? "text-gray-300" : ""}>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              car.is_rentable ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                            }`}
                          >
                            {car.is_rentable ? "Rentable" : "Non-Rentable"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/admin/cars/${car.car_id}`)}
                          >
                            <Edit className={darkMode ? "text-gray-300" : ""} />
                            <span className="sr-only">Edit car</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteCar(car.car_id)}
                          >
                            <Trash className={darkMode ? "text-gray-300" : ""} />
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
