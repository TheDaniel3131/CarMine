"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface CheckoutFormData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export const dynamic = 'force-dynamic';

function CarCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carDetails, setCarDetails] = useState<CarCheckoutDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  // const [emailPrefix, setEmailPrefix] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
  const encodedData = searchParams.get("data");
  if (encodedData) {
    try {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setCarDetails(decodedData);
      toast.info("Welcome to checkout! Please enter your payment details.");
    } catch (error) {
      toast.error("Invalid car details. Redirecting to marketplace...");
      console.error("Error parsing car details:", error);
      setTimeout(() => router.push("/marketplace"), 2000);
    }
  } else {
    toast.error("No car details found. Redirecting to marketplace...");
    setTimeout(() => router.push("/marketplace"), 2000);
  }

  // Extract user email from localStorage and set it
  const storedEmail = localStorage.getItem("userEmail");
  if (storedEmail) {
    setUserEmail(storedEmail);
    // const emailPrefix = storedEmail.split("@")[0];
    // setEmailPrefix(emailPrefix);

    // Fetch the userId based on the full userEmail
    fetch(`/api/validate-uid?userEmail=${storedEmail}`) // Change this to use the full userEmail
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.userId) {
          setUserId(data.userId);
        } else {
          toast.error("User not found with the given email.");
        }
      })
      .catch((error) => {
        toast.error("Error fetching user information.");
        console.error("Error fetching userId:", error);
      });
  } else {
    toast.error("User email not found in localStorage.");
  }
}, [searchParams, router]);


  const validateForm = () => {
    if (!formData.cardNumber.trim()) {
      toast.warning("Please enter a card number");
      return false;
    }
    if (!formData.expirationDate.trim()) {
      toast.warning("Please enter an expiration date");
      return false;
    }
    if (!formData.cvv.trim()) {
      toast.warning("Please enter a CVV");
      return false;
    }

    // Basic format validation
    if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      toast.error(
        "Please enter a valid card number in the format 1234 5678 9012 3456"
      );
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
      toast.error("Please enter a valid expiration date (MM/YY)");
      return false;
    }
    if (!/^\d{3}$/.test(formData.cvv)) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGoBack = () => {
    toast.info("Returning to previous page...");
    router.back();
  };

  const simulatePaymentProcess = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call with 2 second delay
      setTimeout(() => {
        // 70% success rate
        const isSuccess = Math.random() < 0.7;
        resolve(isSuccess);
      }, 2000);
    });
  };

  const handleCompletePurchase = async () => {
    if (!carDetails) {
      toast.error("Car details not found");
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    toast.info("Processing your payment...");

    try {
      const isSuccess = await simulatePaymentProcess();

      if (!isSuccess) {
        throw new Error("Payment declined by bank");
      }

      // Call the API to record the checkout using the userId
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Send the userId here
          cardNumber: formData.cardNumber,
          expirationDate: formData.expirationDate,
          cvv: formData.cvv,
          carDetails,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to record checkout");
      }

      toast.success("🎉 Payment successful! Your car purchase is complete.");
      setTimeout(() => {
        router.push("/marketplace");
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Payment failed: ${error.message}`
          : "Payment failed: An unexpected error occurred"
      );
      // Reset form on failure
      setFormData({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!carDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-3xl dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Payment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-8 mt-5">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    placeholder="MM/YY"
                    className="mt-1"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="mt-1"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={handleCompletePurchase}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Complete Purchase"}
              </Button>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
            </div>
            <div className="space-y-6 mb-10 lg:border-l lg:pl-6">
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                {carDetails && (
                  <Image
                    src={carDetails.image_url}
                    alt={`${carDetails.year} ${carDetails.make} ${carDetails.model}`}
                    layout="fill"
                    objectFit="cover"
                    className="bg-gray-100"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                {carDetails && (
                  <p className="text-sm text-gray-500">
                    {carDetails.trim} | {carDetails.exteriorColor} |{" "}
                    {carDetails.mileage.toLocaleString()} miles
                  </p>
                )}
                </h3>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold">Total Price</span>
                <span className="text-2xl font-bold">
                  ${carDetails.price.toLocaleString()}
                </span>
              </div>
              {/* <p className="text-sm text-gray-500">
                User Email Prefix: {emailPrefix}
              </p> */}
              <p className="text-sm text-gray-500">
                User Email: {userEmail}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function CarCheckout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarCheckoutContent />
    </Suspense>
  );
}
