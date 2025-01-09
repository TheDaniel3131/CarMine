"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  listed_date?: string; // Added for sorting by date
}

interface Category {
  name: string;
  makes: string[];
}

const API_KEY = "ZrQEPSkKZGFuYWVscG9oMzEzMUBnbWFpbC5jb20=";

const categories: Category[] = [
  {
    name: "Luxury",
    makes: ["BMW", "Mercedes-Benz", "Audi", "Lexus", "Porsche", "Tesla"],
  },
  {
    name: "Sports",
    makes: ["Ferrari", "Lamborghini", "Porsche", "Chevrolet", "Dodge"],
  },
  {
    name: "SUV & Crossover",
    makes: ["Honda", "Toyota", "Ford", "Jeep", "Subaru"],
  },
  {
    name: "Economy",
    makes: ["Toyota", "Honda", "Hyundai", "Kia", "Volkswagen"],
  },
  {
    name: "Truck",
    makes: ["Ford", "Chevrolet", "RAM", "GMC", "Toyota"],
  },
];

// Get all unique makes for search suggestions
const allMakes = Array.from(
  new Set(categories.flatMap((category) => category.makes))
);

export default function MarketplacePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [page, setPage] = useState(1);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("newest");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      let url = `https://auto.dev/api/listings?apikey=${API_KEY}&page=${page}&limit=100`;

      if (selectedMake) {
        url += `&make=${selectedMake}`;
      } else if (searchTerm && !isSearchDisabled) {
        url += `&make=${searchTerm}`; // Using make instead of search parameter
      }

      // Add sorting parameters
      switch (sortOption) {
        case "newest":
          url += "&sort=listed_date:desc";
          break;
        case "oldest":
          url += "&sort=listed_date:asc";
          break;
        case "price_high":
          url += "&sort=price:desc";
          break;
        case "price_low":
          url += "&sort=price:asc";
          break;
      }

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();

      const transformedCars: Car[] = data.records.map(
        (car: {
          id: string;
          make: string;
          model: string;
          year: number;
          trim: string;
          price: string;
          mileage: string;
          primaryPhotoUrl: string;
          listed_date?: string;
        }) => ({
          id: car.id.toString(),
          make: car.make,
          model: car.model,
          year: car.year,
          trim: car.trim,
          price: parseFloat(car.price.replace("$", "").replace(",", "")),
          mileage: parseInt(car.mileage.replace(" Miles", "").replace(",", "")),
          image_url: car.primaryPhotoUrl,
          listed_date: car.listed_date,
        })
      );

      setCars((prevCars) =>
        page === 1 ? transformedCars : [...prevCars, ...transformedCars]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cars");
    } finally {
      setLoading(false);
    }
  }, [page, selectedMake, searchTerm, isSearchDisabled, sortOption]);

  // Update search suggestions when search term changes
  useEffect(() => {
    if (searchTerm && !isSearchDisabled) {
      const suggestions = allMakes.filter((make) =>
        make.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchSuggestions(suggestions);
      setIsSearchOpen(true);
    } else {
      setSearchSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchTerm, isSearchDisabled]);

  useEffect(() => {
    let results = cars;

    if (searchTerm && !isSearchDisabled) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(
        (car) =>
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          car.trim.toLowerCase().includes(searchLower)
      );
    }

    if (selectedMake) {
      const makeLower = selectedMake.toLowerCase();
      results = results.filter((car) => car.make.toLowerCase() === makeLower);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      results = results.filter(
        (car) => car.price >= (min || 0) && car.price <= (max || Infinity)
      );
    }

    setFilteredCars(results);
  }, [cars, searchTerm, selectedMake, priceRange, isSearchDisabled]);

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
    if (!isSearchDisabled) {
      setPage(1);
      fetchCars();
    }
  }, [setPage, fetchCars, isSearchDisabled]);

  const handleMakeSelect = useCallback((make: string) => {
    setSelectedMake((prevMake) => {
      if (prevMake === make) {
        setIsSearchDisabled(false);
        return "";
      } else {
        setIsSearchDisabled(true);
        return make;
      }
    });
    setPage(1);
    setSearchTerm("");
  }, []);

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsSearchOpen(false);
    handleSearch();
  };

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

      <main className="container mx-auto px-6 py-10 md:py-12">
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
                      <ScrollArea className="h-[80px] rounded-md">
                        <div className="flex flex-wrap gap-2 p-2">
                          {category.makes.map((make) => (
                            <Badge
                              key={make}
                              variant={
                                selectedMake.toLowerCase() ===
                                make.toLowerCase()
                                  ? "default"
                                  : "outline"
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
                <div className="relative w-full">
                  <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <PopoverTrigger asChild>
                      <Input
                        id="search"
                        type="text"
                        placeholder={
                          isSearchDisabled
                            ? "Select category first..."
                            : "Search cars..."
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-700"
                        disabled={isSearchDisabled}
                      />
                    </PopoverTrigger>
                    {searchSuggestions.length > 0 && (
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {searchSuggestions.map((suggestion) => (
                                <CommandItem
                                  key={suggestion}
                                  onSelect={() =>
                                    handleSuggestionSelect(suggestion)
                                  }
                                >
                                  {suggestion}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    )}
                  </Popover>
                </div>

                <Select
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value)}
                >
                  <SelectTrigger
                    className={`w-full md:w-[220px] ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price_high">
                     High to Low
                    </SelectItem>
                    <SelectItem value="price_low">
                     Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setPriceRange(value)}>
                  <SelectTrigger
                    className={`w-full md:w-[290px] ${
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
                  disabled={loading || isSearchDisabled}
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
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
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
                      {car.listed_date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Listed:{" "}
                          {new Date(car.listed_date).toLocaleDateString()}
                        </p>
                      )}
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
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  No cars found. Try adjusting your search criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedMake("");
                    setPriceRange("");
                    setSortOption("newest");
                    setPage(1);
                    setIsSearchDisabled(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Reset Filters
                </Button>
              </div>
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
