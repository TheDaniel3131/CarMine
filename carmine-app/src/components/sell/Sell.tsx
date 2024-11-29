"use client"

import { useState, useEffect } from 'react'
import { DollarSign, Camera, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
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

            <Footer darkMode={darkMode} />
        </div>
    )
}