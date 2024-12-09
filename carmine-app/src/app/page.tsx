"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Car,
  ShoppingBag,
  Key,
  Zap,
  Star,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "./globals.css";

export default function CarMine() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadMessages] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
    }
  };

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
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={unreadMessages}
      />

      <main className="container mx-auto px-4 py-20 md:py-24">
        <h1
          className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${
            darkMode
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
          }`}
        >
          Revolutionize Your Car Experience
        </h1>

        <div className="max-w-4xl mx-auto mb-20">
          <form
            onSubmit={handleSearch}
            className={`flex items-center space-x-2 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-2 rounded-full shadow-lg`}
          >
            <Input
              type="text"
              placeholder="Search New Or Rental Cars Here..."
              className={`flex-grow bg-transparent border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                darkMode
                  ? "text-gray-100 placeholder-gray-400"
                  : "text-gray-900 placeholder-gray-500"
              } text-lg`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              className={`${
                darkMode
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } text-white rounded-full px-8 py-6 text-lg font-semibold`}
            >
              <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24 py-16">
          {[
            {
              icon: Car,
              title: "Buy Your Dream Cars",
              description:
          "Thinking of a dream car that you always wanted to buy? Browse our wide range of vehicles to find one that suits you. From SUVs to sedans, we've got you all!",
              action: "Explore Market",
              link: "/buy",
            },
            {
              icon: ShoppingBag,
              title: "Sell Your Own Cars",
              description:
          "CarMine allows you to sell your car with ease with our streamlined process in just minutes! Upload your photos, set your price and your car details. You are ready to go!",
              action: "Browse Parts",
              link: "/marketplace",
            },
            {
              icon: Key,
              title: "Car Rentals",
              description:
          "Rent vehicles for any occasion from economy to luxury with flexible plans and availability. CarMine covers you with excellent customer service and extensive selection of cars.",
              action: "Rent Now",
              link: "/rent",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${
          darkMode ? "bg-gray-800" : "bg-white"
              } p-8 rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105`}
            >
              <div className="flex justify-center mb-6">
          <item.icon
            className={`w-20 h-20 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
              </div>
              <h2
          className={`text-2xl font-bold mb-4 text-center ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
              >
          {item.title}
              </h2>
              <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-600"
          } mb-6 text-center`}
              >
          {item.description}
              </p>
              <Link href={item.link}>
          <Button
            className={`w-full ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            } text-white text-lg font-semibold py-6`}
          >
            {item.action}
          </Button>
              </Link>
            </div>
          ))}
        </div>

        <section
          className={`mb-24 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-3xl shadow-2xl p-12`}
        >
          <h2
            className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
                : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
            }`}
          >
            Why Choose CarMine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Quick and easy transactions for all your automotive needs.",
              },
              {
                icon: Shield,
                title: "Expert Support",
                description:
                  "Our team of automotive experts is always ready to assist you.",
              },
              {
                icon: Star,
                title: "Community Driven",
                description:
                  "Join a thriving community of car enthusiasts and experts.",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Your safety and security are our top priorities in every deal.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } p-6 rounded-xl`}
              >
                <item.icon
                  className={`w-16 h-16 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } mb-4`}
                />
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Join the CarMine Community
          </h2>
          <p className="text-xl text-center mb-12">
            Get exclusive deals, automotive news, and connect with fellow car
            enthusiasts.
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className={`${
                  darkMode
                    ? "bg-gray-800 text-blue-400 hover:bg-gray-950"
                    : "bg-white text-blue-600 hover:bg-gray-100"
                } font-semibold px-8 py-6 text-xl`}
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>

        <section className="mb-24">
          <h2
            className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
                : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
            }`}
          >
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "John D.",
                comment:
                  "CarMine made buying my dream car a breeze. Highly recommended!",
              },
              {
                name: "Sarah M.",
                comment:
                  "The parts marketplace saved me time and money. Great selection and prices.",
              },
              {
                name: "Mike R.",
                comment:
                  "Renting through CarMine was smooth and hassle-free. Will use again!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  &quot;{testimonial.comment}&quot;
                </p>
                <p
                  className={`font-semibold ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
