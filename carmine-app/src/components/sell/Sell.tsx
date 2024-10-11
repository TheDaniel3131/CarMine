"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Car, DollarSign, Camera, FileText, Menu, Sun, Moon, Twitter, Facebook, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SellPage() {
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

            <main className="container mx-auto px-4 py-20 md:py-24">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Sell Your Car
                </h1>

                <div className="max-w-2xl mx-auto">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="make" className="block text-sm font-medium mb-2">Make</label>
                            <Input id="make" type="text" placeholder="e.g. Toyota" className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
                        </div>
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium mb-2">Model</label>
                            <Input id="model" type="text" placeholder="e.g. Camry" className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
                        </div>
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium mb-2">Year</label>
                            <Input id="year" type="number" placeholder="e.g. 2020" className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-2">Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input id="price" type="number" placeholder="e.g. 15000" className={`w-full pl-10 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                            <Textarea id="description" placeholder="Describe your car..." className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} />
                        </div>
                        <div>
                            <label htmlFor="photos" className="block text-sm font-medium mb-2">Photos</label>
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-1">Drag and drop your photos here, or click to select files</p>
                                <input id="photos" type="file" multiple className="hidden" />
                            </div>
                        </div>
                        <Button type="submit" className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                            <FileText className="w-4 h-4 mr-2" /> List Your Car
                        </Button>
                    </form>
                </div>
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