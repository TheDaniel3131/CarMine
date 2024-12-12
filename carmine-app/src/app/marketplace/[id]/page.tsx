"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Gauge,
  Car,
  DollarSign,
  Shield,
  ThumbsUp,
  Loader2,
  Share2,
  Heart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  photoUrls?: string[];
  condition?: string;
}

const API_KEY = "ZrQEPSkKZGFuYWVscG9oMzEzMUBnbWFpbC5jb20=";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const [darkMode, setDarkMode] = useState(false);
  const [car, setCar] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [showFinanceDialog, setShowFinanceDialog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://auto.dev/api/listings?apikey=${API_KEY}&page=1&limit=100`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }

        const data = await response.json();
        const carRecord = data.records.find(
          (record: { id: number }) => record.id.toString() === params.id
        );

        if (!carRecord) {
          throw new Error("Car not found");
        }

        const transformedCar: CarDetails = {
          id: carRecord.id.toString(),
          make: carRecord.make,
          model: carRecord.model,
          year: carRecord.year,
          trim: carRecord.trim,
          price: carRecord.priceUnformatted,
          mileage: carRecord.mileageUnformatted,
          image_url: carRecord.primaryPhotoUrl,
          location: `${carRecord.city}, ${carRecord.state}`,
          exteriorColor: carRecord.displayColor || "Not Specified",
          interiorColor: carRecord.interiorColor || "Not Specified",
          fuelType: carRecord.fuelType || "Not Specified",
          transmission: carRecord.transmission || "Not Specified",
          engine: carRecord.engine || "Not Specified",
          vin: carRecord.vin,
          description: `${carRecord.year} ${carRecord.make} ${carRecord.model} ${carRecord.trim} with ${carRecord.mileageHumanized} located in ${carRecord.city}, ${carRecord.state}. This ${carRecord.condition} vehicle comes with a VIN of ${carRecord.vin}.`,
          photoUrls: carRecord.photoUrls,
          condition: carRecord.condition,
        };

        setCar(transformedCar);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load car details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.id]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${car?.year} ${car?.make} ${car?.model}`,
        text: car?.description,
        url: window.location.href,
      });
    } catch {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success("Added to favorites!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info("Removed from favorites", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleBuyRent = () => {
    if (!car) return;

    const checkoutData = {
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      trim: car.trim,
      price: car.price,
      mileage: car.mileage,
      image_url: car.image_url,
      exteriorColor: car.exteriorColor,
      condition: car.condition,
    };
    const encodedData = encodeURIComponent(JSON.stringify(checkoutData));
    router.push(`/checkout?data=${encodedData}`);
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
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-8">{error || "Failed to load car details"}</p>
        <Button
          onClick={() => router.push("/marketplace")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Return to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={0}
      />

      <main className="container mx-auto px-16 py-6 md:py-10">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => router.push("/marketplace")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Marketplace
          </Button>
            <div className="flex gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className={`flex items-center ${
              darkMode ? "text-white bg-gray-700 border-gray-900" : "text-gray-900"
              }`}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button
              onClick={handleFavorite}
              variant="outline"
              className={`flex items-center ${
              isFavorite ? "text-red-500" : darkMode ? "text-white bg-gray-700 border-gray-900" : "text-gray-900"
              }`}
            >
              <Heart
              className={`w-4 h-4 mr-1 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={car.image_url}
                alt={`${car.year} ${car.make} ${car.model}`}
                width={600}
                height={400}
                className="h-64 w-full object-cover md:h-full md:w-160"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {car.year} {car.make} {car.model}
                  </div>
                  <h1 className="mt-1 text-3xl font-bold">{car.trim}</h1>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {/* {car.condition} */}
                </Badge>
              </div>

              <p className="mt-2 text-2xl text-blue-600 dark:text-blue-400">
                ${car.price.toLocaleString()}
              </p>

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

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Exterior Color:
                  </span>{" "}
                  {car.exteriorColor}
                </div>
                <div>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Interior Color:
                  </span>{" "}
                  {car.interiorColor}
                </div>
                <div>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Fuel Type:
                  </span>{" "}
                  {car.fuelType}
                </div>
                <div>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Engine:
                  </span>{" "}
                  {car.engine}
                </div>
              </div>

              <div className="mt-6 text-sm">
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  VIN:
                </span>{" "}
                {car.vin}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {car.description}
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <Button
                  className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleBuyRent}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Buy/Rent Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {car.photoUrls && car.photoUrls.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">More Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {car.photoUrls.map((url, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <Image
                    src={url}
                    alt={`${car.year} ${car.make} ${car.model} - Photo ${
                      index + 1
                    }`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Why Choose CarMine?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="font-semibold mb-1">Verified Listings</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  All our listings are thoroughly checked for authenticity and
                  accuracy.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ThumbsUp className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="font-semibold mb-1">Quality Assurance</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We ensure all vehicles meet our high standards before listing.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="font-semibold mb-1">Competitive Pricing</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Get the best deals with our market-competitive pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
