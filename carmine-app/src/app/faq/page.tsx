"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    const [darkMode, setDarkMode] = useState(false)
    const [progress, setProgress] = useState(0)
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

    const faqItems = [
        {
            question: "How does CarMine ensure the quality of listed vehicles?",
            answer: "CarMine employs a rigorous verification process for all listed vehicles. Our team of experts reviews each listing, and we require sellers to provide detailed information and high-quality images. We also encourage buyers to have independent inspections before making a purchase."
        },
        {
            question: "What fees are associated with buying or selling a car on CarMine?",
            answer: "For buyers, browsing and contacting sellers is free. Sellers pay a small listing fee, and a success fee is charged only when a car is sold. The exact fees depend on the vehicle's price and are clearly displayed before listing. We strive to keep our fees competitive to provide the best value for our users."
        },
        {
            question: "How does the car rental process work on CarMine?",
            answer: "Our car rental process is simple and user-friendly. Browse available vehicles, select your dates, and book directly through our platform. We partner with reputable rental agencies and individual car owners to offer a wide selection. All rentals include insurance, and you can choose to add additional coverage if desired."
        },
        {
            question: "What kind of support does CarMine offer for transactions?",
            answer: "CarMine provides comprehensive support throughout the entire transaction process. This includes a secure messaging system, transaction monitoring, and a dedicated support team to assist with any issues. We also offer escrow services for added security on high-value transactions."
        },
        {
            question: "How does CarMine verify the authenticity of parts in the marketplace?",
            answer: "We have a strict verification process for parts listed in our marketplace. Sellers must provide detailed information about the part's condition, origin, and compatibility. Our team reviews listings and we have a rating system for sellers. We also offer buyer protection to ensure satisfaction with purchases."
        },
        {
            question: "What should I do if I encounter an issue with a transaction on CarMine?",
            answer: "If you encounter any issues, please contact our customer support team immediately. We have a dispute resolution process in place to handle any conflicts between buyers and sellers. Our goal is to ensure fair and satisf actory outcomes for all parties involved."
        }
    ]

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="container mx-auto px-4 py-20 md:py-24">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Frequently Asked Questions
                </h1>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className={`text-left ${darkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-16 text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Still have questions?</h2>
                    <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>If you couldn&apos;t find the answer to your question, feel free to contact us.</p>
                    <Button className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                        Contact Support
                    </Button>
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    )
}