import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function PaymentFailedPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <p className="text-xl font-semibold mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-600">
            Your payment could not be processed. Please try again.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/checkout">
            <Button>Try Again</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
