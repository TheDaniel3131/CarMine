"use client"

import { useState, useEffect, FormEvent, DragEvent } from 'react'
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
    const [isDragging, setIsDragging] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isFetching, setIsFetching] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        const text = e.dataTransfer.getData("text");

        if (files && files[0]) {
        // Handle dropped file
        setImage(files[0]);
        } else if (text) {
        // Handle dropped URL
        await handleUrlDrop(text);
        }
    };

    const handleUrlDrop = async (url: string) => {
        try {
        setIsFetching(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch the image from URL");

        const blob = await response.blob();
        const file = new File([blob], "uploaded_image.jpg", { type: blob.type });
        setImage(file);
        setImageUrl("");
        } catch (error) {
        console.error("Error fetching image from URL:", error);
        alert("Could not fetch the image from the provided URL.");
        } finally {
        setIsFetching(false);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);    
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    };    

    const handleUrlSubmit = async () => {
      if (!imageUrl) return;

      await handleUrlDrop(imageUrl);

      try {
        setIsFetching(true);
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Failed to fetch the image");
        const blob = await response.blob();
        const file = new File([blob], "uploaded_image.jpg", {
          type: blob.type,
        });
        setImage(file);
        setImageUrl("");
      } catch (error) {
        console.error("Error fetching image:", error);
        alert("Could not fetch the image. Please check the URL.");
      } finally {
        setIsFetching(false);
      }
    };

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
            setUploadProgress(0)

            let imageUrl = '';
    
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
            // Create unique filename
            const fileName = `${Date.now()}-${image.name.replace(/\s/g, '_')}`;
            const uploadUrl = `https://carmine-listings.s3.amazonaws.com/${fileName}`;

            try {
                // Upload to S3
                const uploadResult = await fetch(uploadUrl, {
                    method: 'PUT',
                    body: image,
                    headers: {
                        'Content-Type': image.type,
                    }
                });

                if (!uploadResult.ok) {
                    throw new Error('Failed to upload image to S3');
                }

                imageUrl = uploadUrl;
            } catch (uploadError) {
                console.error('Upload error:', uploadError);
                throw new Error('Failed to upload image. Please try again.');
            }
        }
            
            // Create form data with S3 image key instead of file
            const carData = {
              car_make: make.trim(),
              car_model: model.trim(),
              car_year: year.trim(),
              car_mileage: mileage.trim(),
              car_price: price.trim(),
              car_description: description.trim(),
              is_rentable: isRentable,
              car_image_url: imageUrl, // Send S3 key instead of file
            };            

            // Submit car data to your backend
            const response = await fetch('/api/sell', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(carData),
            });
    
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
            setUploadProgress(0);
    
            // Show success toast
            toast.success('Car listed successfully!')
    
            // Redirect to buy page or show listings
            router.push('/marketplace')
    
        } catch (error) {
            setUploadProgress(0);
            setErrorMessage(
                error instanceof Error ? error.message : 'Failed to list your car. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
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
          unreadMessages={0}
        />
        <main className="container mx-auto px-4 py-10 md:py-12">
          <h1
            className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
                : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
            }`}
          >
            Sell & Rent Your Cars
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
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium mb-2"
                  >
                    Make
                  </label>
                  <Input
                    id="make"
                    type="text"
                    placeholder="e.g. Toyota"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium mb-2"
                  >
                    Model
                  </label>
                  <Input
                    id="model"
                    type="text"
                    placeholder="e.g. Camry"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium mb-2"
                  >
                    Year
                  </label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="e.g. 2020"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="mileage"
                    className="block text-sm font-medium mb-2"
                  >
                    Mileage
                  </label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="e.g. 50000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium mb-2"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g. 15000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`w-full pl-10 ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-2"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your car..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="photos"
                    className="block text-sm font-medium mb-2"
                  >
                    Photos
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                      isDragging
                        ? "border-blue-500"
                        : darkMode
                        ? "border-gray-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => document.getElementById("photos")?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  >
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1">
                      Drag and drop your photo here, or click to select file
                    </p>
                    <input
                      id="photos"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {image && (
                      <div className="mt-2">
                          <p className="text-sm text-gray-500">{image.name} selected</p>
                          {uploadProgress > 0 && uploadProgress < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                  <div
                                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                      style={{ width: `${uploadProgress}%` }}
                                  ></div>
                              </div>
                          )}
                      </div>
                    )}

                  <div className="mt-4">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium mb-2"
                    >
                      Or add an image URL:
                    </label>
                    <div className="flex">
                      <input
                        id="imageUrl"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={`border rounded-l px-4 py-2 w-full ${
                          darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-900"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleUrlSubmit}
                        disabled={isFetching}
                        className={`px-4 py-2 rounded-r ${
                          isFetching
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {isFetching ? "Fetching..." : "Add"}
                      </button>
                    </div>
                  </div>
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
                  className={`w-full ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Listing Car..." : "List Your Car"}
                </Button>
              </form>
            </div>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    );
}