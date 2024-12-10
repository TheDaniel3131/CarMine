"use client"

import { useState, useEffect, FormEvent } from 'react'
import { DollarSign, Camera, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SellPage() {
    const router = useRouter()
    const [darkMode, setDarkMode] = useState(false)
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [mileage, setMileage] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('') 
    const [isRentable, setIsRentable] = useState(false) 

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
    
        // Reset error message
        setErrorMessage('')
    
        // Comprehensive validation
        const validationErrors: string[] = []
    
        // Trim and validate each field
        const trimmedMake = make.trim()
        const trimmedModel = model.trim()
        const trimmedYear = year.trim()
        const trimmedMileage = mileage.trim()
        const trimmedPrice = price.trim()
        const trimmedDescription = description.trim()
    
        // Validation checks
        if (!trimmedMake) {
            validationErrors.push('Car make is required')
        }
    
        if (!trimmedModel) {
            validationErrors.push('Car model is required')
        }
    
        if (!trimmedYear) {
            validationErrors.push('Car year is required')
        } else {
            const yearNum = parseInt(trimmedYear)
            const currentYear = new Date().getFullYear()
            if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
                validationErrors.push('Please enter a valid year between 1900 and ' + (currentYear + 1))
            }
        }
    
        if (!trimmedMileage) {
            validationErrors.push('Mileage is required')
        } else {
            const mileageNum = parseInt(trimmedMileage)
            if (isNaN(mileageNum) || mileageNum < 0) {
                validationErrors.push('Mileage must be a non-negative number')
            }
        }
    
        if (!trimmedPrice) {
            validationErrors.push('Price is required')
        } else {
            const priceNum = parseFloat(trimmedPrice)
            if (isNaN(priceNum) || priceNum <= 0) {
                validationErrors.push('Price must be a positive number')
            }
        }
    
        if (!trimmedDescription) {
            validationErrors.push('Car description is required')
        } else if (trimmedDescription.length < 1) {
            validationErrors.push('Description must not be empty')
        }
    
        // Check if an image is uploaded
        if (!image) {
            validationErrors.push('At least one car photo is required')
        }
    
        // If there are validation errors, display them and stop submission
        if (validationErrors.length > 0) {
            setErrorMessage(validationErrors.join('. '))
            return
        }
    
        try {
            setIsSubmitting(true)
    
            const formData = new FormData()
            formData.append('car_make', trimmedMake)
            formData.append('car_model', trimmedModel)
            formData.append('car_year', trimmedYear)
            formData.append('car_mileage', trimmedMileage)
            formData.append('car_price', trimmedPrice)
            formData.append('car_description', trimmedDescription)
            formData.append("is_rentable", JSON.stringify(isRentable))
            
            // Append image if selected
            if (image) {
                formData.append('car_image', image)
            }
    
            const response = await fetch('/api/sell', {
                method: 'POST',
                body: formData
            })
    
            // Log the full response for debugging
            console.log('Response status:', response.status)
            
            const result = await response.json()
            console.log('Response body:', result)
    
            if (!response.ok) {
                throw new Error(result.error || 'Failed to list car')
            }
    
            // Reset form
            setMake('')
            setModel('')
            setYear('')
            setMileage('')
            setPrice('')
            setDescription('')
            setImage(null)
            setIsRentable(false)
    
            // Show success toast
            toast.success('Car listed successfully!')
    
            // Redirect to buy page or show listings
            router.push('/marketplace')
    
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : 'Failed to list your car. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} unreadMessages={0}/>
            <main className="container mx-auto px-4 py-20 md:py-24">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Sell Your Car
                </h1>

                <div className="max-w-2xl mx-auto">
                    {errorMessage && (
                        <div className="mb-6 text-red-600 bg-red-100 p-4 rounded">
                            {errorMessage}
                        </div>
                    )}
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="make" className="block text-sm font-medium mb-2">Make</label>
                            <Input 
                                id="make" 
                                type="text" 
                                placeholder="e.g. Toyota" 
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                            />
                        </div>
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium mb-2">Model</label>
                            <Input 
                                id="model" 
                                type="text" 
                                placeholder="e.g. Camry" 
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                            />
                        </div>
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium mb-2">Year</label>
                            <Input 
                                id="year" 
                                type="number" 
                                placeholder="e.g. 2020" 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                            />
                        </div>
                        <div>
                            <label htmlFor="mileage" className="block text-sm font-medium mb-2">Mileage</label>
                            <Input 
                                id="mileage" 
                                type="number" 
                                placeholder="e.g. 50000" 
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value)}
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-2">Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input 
                                    id="price" 
                                    type="number" 
                                    placeholder="e.g. 15000" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={`w-full pl-10 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                            <Textarea 
                                id="description" 
                                placeholder="Describe your car..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`} 
                            />
                        </div>
                        <div>
                            <label htmlFor="photos" className="block text-sm font-medium mb-2">Photos</label>
                            <div 
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                                onClick={() => document.getElementById('photos')?.click()}
                            >
                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-1">Drag and drop your photo here, or click to select file</p>
                                <input 
                                    id="photos" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden" 
                                />
                            </div>
                            {image && (
                                <div className="mt-2 text-sm text-gray-500">
                                    {image.name} selected
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="isRentable" className="flex items-center">
                                <input
                                    id="isRentable"
                                    type="checkbox"
                                    checked={isRentable}
                                    onChange={(e) => setIsRentable(e.target.checked)}
                                    className="mr-2"
                                />
                                Allow for Rent
                            </label>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        >
                            <FileText className="w-4 h-4 mr-2" /> 
                            {isSubmitting ? 'Listing Car...' : 'List Your Car'}
                        </Button>
                    </form>
                    </div>
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    )
}