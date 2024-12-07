"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Gauge, Car, DollarSign, Shield, ThumbsUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CarDetails {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  image_url: string;
  location: string;
  exteriorColor: string;
  interiorColor: string;
  fuelType: string;
  transmission: string;
  engine: string;
  vin: string;
  description: string;
}

const API_KEY = "ZrQEPSkKZGFuYWVscG9oMzEzMUBnbWFpbC5jb20=";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [darkMode, setDarkMode] = useState(false);
  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://auto.dev/api/listings/${params.id}?apikey=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        
        const data = await response.json();
        
        if (!data || typeof data !== "object") {
          throw new Error("Invalid data received from API");
        }
        
        const transformedCar: CarDetails = {
          id: data.id?.toString() ?? "N/A",
          make: data.make ?? "N/A",
          model: data.model ?? "N/A",
          year: parseInt(data.year) || 0,
          trim: data.trim ?? "N/A",
          price: parseFloat(data.price?.replace("$", "").replace(",", "")) || 0,
          mileage: parseInt(data.mileage?.replace(" Miles", "").replace(",", "")) || 0,
          image_url: data.primaryPhotoUrl ?? "/placeholder.svg?height=400&width=600",
          location: data.location ?? "N/A",
          exteriorColor: data.exteriorColor ?? "N/A",
          interiorColor: data.interiorColor ?? "N/A",
          fuelType: data.fuelType ?? "N/A",
          transmission: data.transmission ?? "N/A",
          engine: data.engine ?? "N/A",
          vin: data.vin ?? "N/A",
          description: data.description ?? "No description available.",
        };

        setCar(transformedCar);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err instanceof Error ? err.message : "Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.id]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-8">{error || "Failed to load car details"}</p>
        <Button onClick={() => router.push("/marketplace")} className="bg-blue-600 hover:bg-blue-700 text-white">
          Return to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} unreadMessages={0} />

      <main className="container mx-auto px-4 py-20 md:py-24">
        <Button
          onClick={() => router.push("/marketplace")}
          className="mb-8 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
                width={600}
                height={400}
                className="h-full w-full object-cover md:w-96"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold">
                {car.year} {car.make} {car.model}
              </div>
              <h1 className="mt-1 text-4xl font-bold">{car.trim}</h1>
              <p className="mt-2 text-3xl text-blue-600 dark:text-blue-400">${car.price.toLocaleString()}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {car.year}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {car.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Gauge className="w-4 h-4 mr-1" />
                  {car.mileage.toLocaleString()} miles
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Car className="w-4 h-4 mr-1" />
                  {car.transmission}
                </Badge>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Exterior Color</h3>
                  <p>{car.exteriorColor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Interior Color</h3>
                  <p>{car.interiorColor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Fuel Type</h3>
                  <p>{car.fuelType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Engine</h3>
                  <p>{car.engine}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">VIN</h3>
                <p>{car.vin}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
              </div>

              <div className="mt-8 flex space-x-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Make an Offer
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Schedule Test Drive
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose CarMine?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <div>
                <h3 className="font-semibold mb-2">Verified Listings</h3>
                <p className="text-gray-700 dark:text-gray-300">All our listings are thoroughly checked for authenticity and accuracy.</p>
              </div>
            </div>
            <div className="flex items-start">
              <ThumbsUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <div>
                <h3 className="font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-700 dark:text-gray-300">We ensure all vehicles meet our high standards before listing.</p>
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
              <div>
                <h3 className="font-semibold mb-2">Competitive Pricing</h3>
                <p className="text-gray-700 dark:text-gray-300">Get the best deals with our market-competitive pricing.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
