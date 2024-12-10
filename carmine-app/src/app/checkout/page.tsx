"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CarCheckoutDetails {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  mileage: number;
  image_url: string;
  exteriorColor: string;
}

export default function CarCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carDetails, setCarDetails] = useState<CarCheckoutDetails | null>(null);

  useEffect(() => {
    // Decode and parse the car details from URL parameters
    const encodedData = searchParams.get("data");
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setCarDetails(decodedData);
      } catch (error) {
        console.error("Error parsing car details:", error);
        router.push("/marketplace");
      }
    }
  }, [searchParams, router]);

  const handleGoBack = () => {
    router.back();
  };

  const handleCompletePurchase = () => {
    // Add payment processing logic here
    alert("Purchase completed successfully!"); // Replace with actual payment processing
    router.push("/marketplace");
  };

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-3xl dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Payment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left column: Payment Form */}
            <div className="space-y-8 mt-5">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expDate">Expiration Date</Label>
                  <Input id="expDate" placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="mt-1" />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={handleCompletePurchase}>
                Complete Purchase
              </Button>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
            </div>
            {/* Right column: Car Details */}
            <div className="space-y-6 mb-10 lg:border-l lg:pl-6">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                <Image
                  src={carDetails.image_url}
                  alt={`${carDetails.year} ${carDetails.make} ${carDetails.model}`}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-100"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {carDetails.year} {carDetails.make} {carDetails.model}
                </h3>
                <p className="text-sm text-gray-500">
                  {carDetails.trim} | {carDetails.exteriorColor} | {carDetails.mileage.toLocaleString()} miles
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold">Total Price</span>
                <span className="text-2xl font-bold">${carDetails.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}