"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, Search, HelpCircle } from 'lucide-react'
import { useTheme } from '@/components/ThemeContext'
import './globals.css'

export default function Custom404() {
  const router = useRouter()
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Oops! Page Not Found</CardTitle>
            <CardDescription className="text-center">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className={`text-9xl font-bold ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>404</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
              <Link href="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" /> Home
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link href="/search" className="flex items-center text-sm hover:underline">
              <Search className="mr-2 h-4 w-4" /> Search Cars
            </Link>
            <Link href="/contact" className="flex items-center text-sm hover:underline">
              <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}