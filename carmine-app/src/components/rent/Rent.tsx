"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

export default function RentPage() {
    const [darkMode, setDarkMode] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const rentalCars = [
        { name: "Economy Sedan", price: 39.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/economy-sedan-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Midsize SUV", price: 59.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/midsize-suv-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Luxury Sedan", price: 89.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury-sedan-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Compact Car", price: 34.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/compact-car-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Full-Size Van", price: 79.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/full-size-van-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Sports Car", price: 99.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sports-car-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
    ]

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
          unreadMessages={0} // Add this prop with a default value
        />

        <main className="container mx-auto px-4 py-20 md:py-24">
          <h1
            className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
                : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
            }`}
          >
            Rent Your Perfect Ride
          </h1>

          <div className="max-w-4xl mx-auto mb-12">
            <div
              className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } p-6 rounded-xl shadow-lg`}
            >
              <div className="w-full md:w-1/3">
                <Select>
                  <SelectTrigger
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <SelectValue placeholder="Car Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="midsize">Midsize</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <Calendar
                  mode="single"
                  selected={selectedDate ?? undefined}
                  onSelect={setSelectedDate}
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  type="text"
                  placeholder="Pick-up Location"
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                />
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {rentalCars.map((car, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl overflow-hidden shadow-lg`}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {car.name}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } mb-4`}
                  >
                    Comfortable and reliable rental option
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-2xl font-bold ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      ${car.price}/day
                    </span>
                    <Button
                      size="sm"
                      className={`${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      Book Now
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
              Load More
            </Button>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    );
}