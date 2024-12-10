"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Camera, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { DragEvent } from 'react'
import AH from "@/components/adminheader/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/ThemeContext";

export default function AdminRentCarPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { darkMode } = useTheme();
  
  // State variables
  const [make, setMake] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [mileage, setMileage] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isRentable, setIsRentable] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isFetching, setIsFetching] = React.useState(false);

  // Load existing car data for edit mode
  React.useEffect(() => {
    if (params.id !== "new") {
      fetchCarDetails(params.id);
    }
  }, [params.id]);

  const fetchCarDetails = async (id: string) => {
    try {
      const response = await fetch(`/admin/accessed/cars/${id}`);
      if (!response.ok) throw new Error('Failed to fetch car details');
      
      const carData = await response.json();
      setMake(carData.make);
      setModel(carData.model);
      setYear(carData.year.toString());
      setMileage(carData.mileage.toString());
      setPrice(carData.price.toString());
      setDescription(carData.description);
      setIsRentable(carData.is_rentable);
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast.error('Failed to load car details');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const text = e.dataTransfer.getData("text");

    if (files && files[0]) {
      setImage(files[0]);
    } else if (text) {
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
      toast.error("Could not fetch the image from the provided URL");
    } finally {
      setIsFetching(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the default behavior to allow drop
    console.log("Drag over event triggered");
  };

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
      toast.error("Could not fetch the image. Please check the URL");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error message
    setErrorMessage('');

    // Comprehensive validation
    const validationErrors: string[] = [];

    // Trim and validate each field
    const trimmedMake = make.trim();
    const trimmedModel = model.trim();
    const trimmedYear = year.trim();
    const trimmedMileage = mileage.trim();
    const trimmedPrice = price.trim();
    const trimmedDescription = description.trim();

    // Validation checks
    if (!trimmedMake) {
      validationErrors.push('Car make is required');
    }

    if (!trimmedModel) {
      validationErrors.push('Car model is required');
    }

    if (!trimmedYear) {
      validationErrors.push('Car year is required');
    } else {
      const yearNum = parseInt(trimmedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
        validationErrors.push(`Please enter a valid year between 1900 and ${currentYear + 1}`);
      }
    }

    if (!trimmedMileage) {
      validationErrors.push('Mileage is required');
    } else {
      const mileageNum = parseInt(trimmedMileage);
      if (isNaN(mileageNum) || mileageNum < 0) {
        validationErrors.push('Mileage must be a non-negative number');
      }
    }

    if (!trimmedPrice) {
      validationErrors.push('Price is required');
    } else {
      const priceNum = parseFloat(trimmedPrice);
      if (isNaN(priceNum) || priceNum <= 0) {
        validationErrors.push('Price must be a positive number');
      }
    }

    if (!trimmedDescription) {
      validationErrors.push('Car description is required');
    } else if (trimmedDescription.length < 1) {
      validationErrors.push('Description must not be empty');
    }

    // Check if an image is uploaded
    if (!image) {
      validationErrors.push('At least one car photo is required');
    }

    // If there are validation errors, display them and stop submission
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors.join('. '));
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('car_make', trimmedMake);
      formData.append('car_model', trimmedModel);
      formData.append('car_year', trimmedYear);
      formData.append('car_mileage', trimmedMileage);
      formData.append('car_price', trimmedPrice);
      formData.append('car_description', trimmedDescription);
      formData.append('is_rentable', JSON.stringify(isRentable));
      
      // Append image if selected
      if (image) {
        formData.append('car_image', image);
      }

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to save car');
      }

      toast.success(params.id === 'new' 
        ? 'Car added successfully!' 
        : 'Car updated successfully!');

      // Redirect to cars list
      router.push('/admin/accessed/cars?authenticated=true');

    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to save car. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <AH />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Card
            className={`shadow-sm ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
            }`}
          >
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">
                    {params.id === "new" ? "Add Rentable Car" : "Edit Rentable Car"}
                  </CardTitle>
                  <CardDescription
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {params.id === "new"
                      ? "Add a new car available for rent"
                      : "Edit car rental details"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/accessed/cars?authenticated=true")}
                  className={
                    darkMode
                      ? "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      : "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                  }
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cars
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="mb-6 text-red-600 bg-red-100 p-4 rounded">
                  {errorMessage}
                </div>
              )}
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
                    <div className="mt-2 text-sm text-gray-500">
                      {image.name} selected
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

                {/* Rentable checkbox */}
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
                  {isSubmitting ? "Saving Car..." : (params.id === 'new' ? "Add Car" : "Update Car")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}