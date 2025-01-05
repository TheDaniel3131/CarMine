import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Payment Successful</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <p className="text-xl font-semibold mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-gray-600">
            Your payment has been processed successfully.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
