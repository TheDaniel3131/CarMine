"use client";

import { useState, useEffect } from "react";
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

interface Car {
  car_id: number;
  car_make: string;
  car_model: string;
  car_year: number;
  car_mileage: number;
  car_price: number;
  car_description: string;
  car_quantity: number;
}

export default function BuyPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");

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

  // Fetch cars from the API
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/buy");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data: Car[] = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCars();
  }, []);

  // Filter cars based on search query and price range
  useEffect(() => {
    let results = cars;

    if (searchQuery) {
      results = results.filter(
        (car) =>
          car.car_make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.car_model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.car_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      results = results.filter(
        (car) =>
          car.car_price >= (min || 0) && car.car_price <= (max || Infinity)
      );
    }

    setFilteredCars(results);
  }, [searchQuery, priceRange, cars]);

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

        {/* Search Bar and Filters */}
        <div className="max-w-4xl mx-auto mb-16">
          <div
            className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-xl shadow-lg`}
          >
            <Input
              type="text"
              placeholder="Search by make, model, or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-grow ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            />
            <Select onValueChange={(value) => setPriceRange(value)}>
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
                <SelectItem value="30000-100000">$30,000 - $100,000</SelectItem>
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

        {/* Car Listings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {filteredCars.map((car) => (
            <div
              key={car.car_id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl overflow-hidden shadow-lg`}
            >
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {car.car_year} {car.car_make} {car.car_model}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  {car.car_description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-2xl font-bold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    ${car.car_price.toLocaleString()}
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
