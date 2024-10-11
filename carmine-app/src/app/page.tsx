"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Car, ShoppingBag, Key, Menu, Zap, Sun, Moon, Hammer, Users, ChevronRight, Star, Shield, Facebook, Instagram, Twitter, MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CarMine() {
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
      <header className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-sm sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <span className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                CarMine
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              {['Buy', 'Sell', 'Marketplace', 'Rent'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className={`text-lg font-semibold ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className={darkMode ? 'text-yellow-400' : 'text-gray-600'}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                {progress > 0 && progress < 100 && (
                  <Progress value={progress} className="w-8 h-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2" />
                )}
              </div>
              <Link href="/signin">
                <Button variant="outline" className={`hidden font-bold md:inline-flex ${darkMode ? 'bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} font-semibold`}>
                  Sign In
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`md:hidden ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`w-48 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  {['Buy', 'Sell', 'Marketplace', 'Rent', 'Sign In'].map((item) => (
                    <DropdownMenuItem key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(' ', '')}`}
                        className={`flex w-full font-semibold transition-colors duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem', // 6px rounded corners
                          transition: 'background-color 0.3s ease, color 0.3s ease',
                        }}
                      >
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 md:py-24">
        <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
          Revolutionize Your Car Experience
        </h1>

        <div className="max-w-4xl mx-auto mb-20">
          <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full shadow-lg`}>
            <Input type="text" placeholder="Search cars, parts, or rentals..." className={`flex-grow bg-transparent border-none ${darkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} text-lg`} />
            <Button className={`${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white rounded-full px-8 py-6 text-lg font-semibold`}>
              <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 py-16">
          {[
            { icon: Car, title: "Buy & Sell Cars", description: "Find your dream car or sell your current vehicle with ease. Our advanced matching algorithm ensures the best deals.", action: "Explore Market" },
            { icon: ShoppingBag, title: "Parts Marketplace", description: "Shop for new and used cars, auto parts from trusted sellers. Verified parts and secure transactions guaranteed.", action: "Browse Parts" },
            { icon: Key, title: "Car Rentals", description: "Rent vehicles for any occasion from economy to luxury with flexible plans and availability. CarMine covers you with excellent customer service.", action: "Rent Now" },
          ].map((item, index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105`}>
              <div className="flex justify-center mb-6">
                <item.icon className={`w-20 h-20 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{item.title}</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 text-center`}>{item.description}</p>
              <Button className={`w-full ${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white text-lg font-semibold py-6`}>
                {item.action}
              </Button>
            </div>
          ))}
        </div>

        <section className={`mb-24 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-12`}>
          <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
            Why Choose CarMine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Zap, title: "Lightning Fast", description: "Quick and easy transactions for all your automotive needs." },
              { icon: Hammer, title: "Expert Support", description: "Our team of automotive experts is always ready to assist you." },
              { icon: Users, title: "Community Driven", description: "Join a thriving community of car enthusiasts and experts." },
              { icon: Shield, title: "Secure Transactions", description: "Your safety and security are our top priorities in every deal." },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col items-center text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                <item.icon className={`w-16 h-16 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`} />
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{item.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
            Featured Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300`}>
                <Image src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-${i}-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg`} alt={`Car ${i}`} width={400} height={250} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>2023 Model X</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Luxury sedan with advanced features and stunning performance.</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>$45,000</span>
                    <Button size="lg" className={`${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white font-semibold`}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className={`${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500  to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white font-semibold px-8 py-6 text-xl`}>
              View All Listings <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </section>

        <section className="mb-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Join the CarMine Community</h2>
          <p className="text-xl text-center mb-12">Get exclusive deals, automotive news, and connect with fellow car enthusiasts.</p>
          <div className="flex justify-center">
            <Button size="lg" variant="secondary" className={`${darkMode ? 'bg-gray-800 text-blue-400 hover:bg-gray-950' : 'bg-white text-blue-600 hover:bg-gray-100'} font-semibold px-8 py-6 text-xl`}>
              Sign Up Now
            </Button>
          </div>
        </section>

        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "John D.", comment: "CarMine made buying my dream car a breeze. Highly recommended!" },
              { name: "Sarah M.", comment: "The parts marketplace saved me time and money. Great selection and prices." },
              { name: "Mike R.", comment: "Renting through CarMine was smooth and hassle-free. Will use again!" },
            ].map((testimonial, index) => (
              <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>&quot;{testimonial.comment}&quot;</p>
                <p className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">About CarMine</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-blue-100'}>Revolutionizing the automotive industry with cutting-edge technology and user-centric services.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'FAQ', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '')}`} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                {['Buy a Car', 'Sell Your Car', 'Parts Marketplace', 'Car Rentals'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '')}`} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: Facebook },
                  { name: 'Instagram', icon: Instagram },
                  { name: 'Twitter', icon: Twitter },
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href="#"
                    className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-blue-100 hover:text-white'} transition-colors`}
                    aria-label={platform.name}
                  >
                    <platform.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`text-center ${darkMode ? 'text-gray-400 border-t border-gray-700' : 'text-blue-100 border-t border-blue-400'} pt-8`}>
            <p>&copy; {new Date().getFullYear()} CarMine. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Chatbot darkMode={darkMode} />
    </div>
  )
}

type ChatbotProps = {
  darkMode: boolean;
};

function Chatbot({ darkMode }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ])
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      setInput("")
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. Our support team will get back to you soon.", sender: "bot" }])
      }, 0)
    }
  }

  return (
    <>
      <Button
        className={`fixed bottom-4 right-4 rounded-full p-4 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl`}>
          <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-t-lg`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>CarMine Support</h3>
          </div>
          <div className={`h-80 overflow-y-auto p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-grow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
              />
              <Button type="submit" className={`ml-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}