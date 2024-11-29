"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, ShoppingCart } from 'lucide-react'
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

export default function MarketplacePage() {
    const [darkMode, setDarkMode] = useState(false)

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

    const parts = [
        { name: "High Performance Brake Pads", price: 89.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brake-pads-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "LED Headlight Kit", price: 129.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headlight-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Performance Air Filter", price: 49.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/air-filter-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Alloy Wheel Set", price: 599.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wheels-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Suspension Lowering Kit", price: 299.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suspension-kit-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
        { name: "Performance Exhaust System", price: 449.99, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exhaust-system-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
    ]

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

            <main className="container mx-auto px-4 py-20 md:py-24">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Parts Marketplace
                </h1>

                <div className="max-w-4xl mx-auto mb-12">
                    <div className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                        <Input type="text" placeholder="Search for parts..." className={`flex-grow ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`} />
                        <Select>
                            <SelectTrigger className={`w-full md:w-[180px] ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="brakes">Brakes</SelectItem>
                                <SelectItem value="suspension">Suspension</SelectItem>
                                <SelectItem value="engine">Engine</SelectItem>
                                <SelectItem value="exterior">Exterior</SelectItem>
                                <SelectItem value="interior">Interior</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className={`w-full md:w-auto ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                            <Search className="w-4 h-4 mr-2" /> Search
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {parts.map((part, index) => (
                        <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg`}>
                            <Image src={part.image} alt={part.name} width={400} height={300} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{part.name}</h3>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>High-quality aftermarket part</p>
                                <div className="flex justify-between items-center">
                                    <span className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>${part.price}</span>
                                    <Button size="sm" className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
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
            <Footer darkMode={darkMode} />
        </div>
    )
}