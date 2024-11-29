"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, Zap, Shield } from 'lucide-react'


export default function AboutUs() {
    const [darkMode, setDarkMode] = useState(false)
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

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <main className="container mx-auto px-4 py-16">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    About CarMine
                </h1>

                <div className="max-w-4xl mx-auto mb-16">
                    <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        CarMine is revolutionizing the automotive industry by providing a comprehensive platform for buying, selling, and renting vehicles, as well as a marketplace for auto parts. Our mission is to make every aspect of car ownership and maintenance as seamless and enjoyable as possible.
                    </p>
                    <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Founded in 2023, CarMine has quickly grown to become a trusted name in the automotive world. Our team of passionate car enthusiasts and tech experts work tirelessly to bring you the best possible experience, whether you&apos;re looking to purchase your dream car, sell your current vehicle, or find that hard-to-get part.
                    </p>
                </div>

                <section className={`mb-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-12`}>
                    <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Users, title: "Community First", description: "We believe in fostering a strong, supportive community of car enthusiasts and experts." },
                            { icon: Zap, title: "Innovation", description: "We're constantly pushing the boundaries of what's possible in the automotive industry." },
                            { icon: Shield, title: "Trust & Security", description: "Your safety and security are our top priorities in every transaction and interaction." },
                        ].map((value, index) => (
                            <div key={index} className={`flex flex-col items-center text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl`}>
                                <value.icon className={`w-16 h-16 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`} />
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{value.title}</h3>
                                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className={`text-4xl font-bold mb-12 text-center text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Jane Doe", role: "CEO & Founder", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-1-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                            { name: "John Smith", role: "CTO", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-2-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                            { name: "Emily Brown", role: "Head of Customer Experience", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-3-Ld5Hy7Ue0Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg" },
                        ].map((member, index) => (
                            <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-lg`}>
                                <Image src={member.image} alt={member.name} width={400} height={400} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{member.name}</h3>
                                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer darkMode={darkMode} />
        </div>
    )
}