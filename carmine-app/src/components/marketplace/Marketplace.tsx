"use client";

// import Link from 'next/link'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Loader2, Lock} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";


interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  image_url: string;
}

interface Category {
  name: string;
  makes: string[];
}

const API_KEY = "ZrQEPSkKZGFuYWVscG9oMzEzMUBnbWFpbC5jb20=";

const categories: Category[] = [
  {
    name: "Luxury",
    makes: ["BMW", "Mercedes-Benz", "Audi", "Lexus", "Porsche", "Tesla"]
  },
  {
    name: "Sports",
    makes: ["Ferrari", "Lamborghini", "Porsche", "Chevrolet", "Dodge"]
  },
  {
    name: "SUV & Crossover",
    makes: ["Honda", "Toyota", "Ford", "Jeep", "Subaru"]
  },
  {
    name: "Economy",
    makes: ["Toyota", "Honda", "Hyundai", "Kia", "Volkswagen"]
  },
  {
    name: "Truck",
    makes: ["Ford", "Chevrolet", "RAM", "GMC", "Toyota"]
  }
];

export default function MarketplacePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [page, setPage] = useState(1);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      let url = `https://auto.dev/api/listings?apikey=${API_KEY}&page=${page}&limit=9`;
      if (selectedMake) url += `&make=${selectedMake}`;
      if (searchTerm) url += `&search=${searchTerm}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      
      const data = await response.json();
      
      // Transform the API response to match your Car interface
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedCars: Car[] = data.records.map((car: any) => ({
        id: car.id.toString(),
        make: car.make,
        model: car.model,
        year: car.year,
        trim: car.trim,
        price: parseFloat(car.price.replace('$', '').replace(',', '')),
        mileage: parseInt(car.mileage.replace(' Miles', '').replace(',', '')),
        image_url: car.primaryPhotoUrl
      }));

      setCars((prevCars) =>
        page === 1 ? transformedCars : [...prevCars, ...transformedCars]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cars");
    } finally {
      setLoading(false);
    }
  }, [page, selectedMake, searchTerm]);

  // Filter cars based on search, make, and price range
  useEffect(() => {
    let results = cars;

    if (searchTerm) {
      results = results.filter(
        (car) =>
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.trim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMake) {
      results = results.filter((car) => car.make === selectedMake);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      results = results.filter(
        (car) =>
          car.price >= (min || 0) && car.price <= (max || Infinity)
      );
    }

    setFilteredCars(results);
  }, [cars, searchTerm, selectedMake, priceRange]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSearch = useCallback(() => {
    setPage(1);
    fetchCars();
  }, [setPage, fetchCars]);

  const handleMakeSelect = useCallback((make: string) => {
    setSelectedMake(make);
    setPage(1);
    fetchCars();
  }, [setPage, fetchCars]);

  const loadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);


  const handleViewDetails = (carId: string) => {
    if (isAuthenticated) {
      router.push(`/marketplace/${carId}`);
    } else {
      router.push("/signin");
    }
  };
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={0}
      />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400">
          Find Your Dream Car
        </h1>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category, index) => (
                  <AccordionItem key={index} value={`category-${index}`}>
                    <AccordionTrigger className="text-left">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="h-[200px] rounded-md">
                        <div className="flex flex-wrap gap-2 p-2">
                          {category.makes.map((make) => (
                            <Badge
                              key={make}
                              variant={
                                selectedMake === make ? "default" : "outline"
                              }
                              className="cursor-pointer"
                              onClick={() => handleMakeSelect(make)}
                            >
                              {make}
                            </Badge>
                          ))}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
              <Label htmlFor="search" className="mb-2 block">
                Search
              </Label>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow bg-gray-100 dark:bg-gray-700"
                />
                <Select onValueChange={(value) => setPriceRange(value)}>
                  <SelectTrigger
                    className={`w-full md:w-[240px] ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-10000">$0 - $10,000</SelectItem>
                    <SelectItem value="10000-20000">
                      $10,000 - $20,000
                    </SelectItem>
                    <SelectItem value="20000-30000">
                      $20,000 - $30,000
                    </SelectItem>
                    <SelectItem value="30000-100000">
                      $30,000 - $100,000
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Search
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-center mb-8">{error}</div>
            )}

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={
                        car.image_url || `/placeholder.svg?height=300&width=400`
                      }
                      alt={`${car.make} ${car.model}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {car.make} {car.model} {car.year}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {car.trim}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          ${car.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {car.mileage.toLocaleString()} miles
                        </p>
                      </div>
                      <Button
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleViewDetails(car.id)}
                      >
                        {isAuthenticated ? (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            View Details
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Sign In to View
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No cars found. Try adjusting your search criteria.
              </p>
            )}

            {filteredCars.length > 0 && !loading && (
              <div className="text-center mt-8">
                <Button
                  size="lg"
                  onClick={loadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Load More
                </Button>
              </div>
            )}

            {loading && (
              <div className="text-center mt-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}