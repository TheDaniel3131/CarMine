"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Menu, Sun, Moon, Users, Zap, Shield, Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AboutUs() {
    const [darkMode, setDarkMode] = useState(false)
    const [progress, setProgress] = useState(0)

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
                            <Link href="/signin">
                                <Button variant="outline" className={`hidden font-bold md:inline-flex ${darkMode ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} font-semibold`}>
                                    Sign In
                                </Button>
                            </Link>
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

            <main className="container mx-auto px-4 py-16">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    About CarMine
                </h1>

                <div className="max-w-4xl mx-auto mb-16">
                    <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        CarMine is revolutionizing the automotive industry by providing a comprehensive platform for buying, selling, and renting vehicles, as well as a marketplace for auto parts. Our mission is to make every aspect of car ownership and maintenance as seamless and enjoyable as possible.
                    </p>
                    <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Founded in 2023, CarMine has quickly grown to become a trusted name in the automotive world. Our team of passionate car enthusiasts and tech experts work tirelessly to bring you the best possible experience, whether you&apos;re looking to purchase your dream car, sell your current vehicle, or find that hard-to-get part.
                    </p>
                </div>

                <section className={`mb-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-12`}>
                    <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Users, title: "Community First", description: "We believe in fostering a strong, supportive community of car enthusiasts and experts." },
                            { icon: Zap, title: "Innovation", description: "We're constantly pushing the boundaries of what's possible in the automotive industry." },
                            { icon: Shield, title: "Trust & Security", description: "Your safety and security are our top priorities in every transaction and interaction." },
                        ].map((value, index) => (
                            <div key={index} className={`flex flex-col items-center text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                                <value.icon className={`w-16 h-16 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`} />
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{value.title}</h3>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Jane Doe", role: "CEO & Founder", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-1-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                            { name: "John Smith", role: "CTO", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-2-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                            { name: "Emily Brown", role: "Head of Customer Experience", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-3-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                        ].map((member, index) => (
                            <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg`}>
                                <Image src={member.image} alt={member.name} width={400} height={400} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{member.name}</h3>
                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white py-12`}>
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
                                {[
                                    { name: 'Facebook', icon: Facebook },
                                    { name: 'Instagram', icon: Instagram },
                                    { name: 'Twitter', icon: Twitter },
                                ].map((platform) => (
                                    <a
                                        key={platform.name}
                                        href="#"
                                        className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}
                                        aria-label={platform.name}
                                    >
                                        <platform.icon className="h-6 w-6" />
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