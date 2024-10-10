"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Menu, Sun, Moon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    const [progress, setProgress] = useState(0)
    const [selectedDate, setSelectedDate] = useState<Date>()

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setDarkMode(!darkMode)
                    return 100
                }
                return prev + 10
            })
        }, 50)
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
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
            <header className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-sm sticky top-0 z-50`}>
                <div className="container mx-auto px-4 py-6">
                    <nav className="flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Car className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                            <span className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                CarMine
                            </span>
                        </Link>
                        <div className="hidden md:flex space-x-8">
                            {['Buy', 'Sell', 'Marketplace', 'Rent'].map((item) => (
                                <Link key={item} href={`/${item.toLowerCase()}`} className={`text-lg font-semibold ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                                    {item}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className={darkMode ? 'text-yellow-400' : 'text-gray-600'}>
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                                {progress > 0 && progress < 100 && (
                                    <Progress value={progress} className="w-8 h-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2" />
                                )}
                            </div>
                            <Button variant="outline" className={`hidden font-bold md:inline-flex ${darkMode ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} font-semibold`}>
                                Sign In
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className={`md:hidden ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className={`w-48 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                    {['Buy', 'Sell', 'Marketplace', 'Rent', 'Sign In'].map((item) => (
                                        <DropdownMenuItem key={item}>
                                            <Link
                                                href={`/${item.toLowerCase().replace(' ', '')}`}
                                                className={`flex w-full font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '0.375rem', // 6px rounded corners
                                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                                }}
                                            >
                                                {item}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-20 md:py-24">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Rent Your Perfect Ride
                </h1>

                <div className="max-w-4xl mx-auto mb-12">
                    <div className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                        <div className="w-full md:w-1/3">
                            <Select>
                                <SelectTrigger className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
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
                                initialFocus
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <Input type="text" placeholder="Pick-up Location" className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} />
                        </div>
                        <Button className={`w-full md:w-auto ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                            <Search className="w-4 h-4 mr-2" /> Search
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {rentalCars.map((car, index) => (
                        <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg`}>
                            <Image src={car.image} alt={car.name} width={400} height={300} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{car.name}</h3>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Comfortable and reliable rental option</p>
                                <div className="flex justify-between items-center">
                                    <span className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>${car.price}/day</span>
                                    <Button size="sm" className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold px-8 py-4 text-lg`}>
                        Load More
                    </Button>
                </div>
            </main>

            <footer className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white py-12 mt-16`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">About CarMine</h3>
                            <p className={darkMode ? 'text-gray-300' : 'text-blue-100'}>Revolutionizing the automotive industry with cutting-edge technology and user-centric services.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {['About Us', 'Contact', 'FAQ', 'Privacy Policy'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(' ', '')}`} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Services</h3>
                            <ul className="space-y-2">
                                {['Buy a Car', 'Sell Your Car', 'Parts Marketplace', 'Car Rentals'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item.toLowerCase().replace(' ', '')}`} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
                                    <a
                                        key={platform}
                                        href="#"
                                        className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}
                                    >
                                        {platform}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={`text-center ${darkMode ? 'text-gray-400 border-t border-gray-700' : 'text-blue-100 border-t border-blue-400'} pt-8`}>
                        <p>&copy; {new Date().getFullYear()} CarMine. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}