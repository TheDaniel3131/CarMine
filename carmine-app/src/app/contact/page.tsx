"use client"

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactUs() {
    const [darkMode, setDarkMode] = useState(false)

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
          unreadMessages={0} // Add this prop with a default value
        />

        <main className="container mx-auto px-4 py-20 md:py-24">
          <h1
            className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
                : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
            }`}
          >
            Contact Us
          </h1>

          <div className="max-w-4xl mx-auto mb-16 grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Get in Touch
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    contact@carmine.com
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    123 CarMine Street, Auto City, AC 12345
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Office Hours
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    );
}