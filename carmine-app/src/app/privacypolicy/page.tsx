"use client"

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
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

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'}`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="container mx-auto px-4 py-20">
                <h1 className={`text-5xl md:text-7xl font-bold text-center mb-12 text-transparent bg-clip-text ${darkMode ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400' : 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600'}`}>
                    Privacy Policy
                </h1>

                <div className="max-w-4xl mx-auto space-y-8">
                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>1. Introduction</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            CarMine is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>2. Information We Collect</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                            We collect information that you provide directly to us. For example, we collect information when you create an account, subscribe to our newsletter, fill out a form, or otherwise communicate with us. The types of information we may collect include:
                        </p>
                        <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Name, email address, and contact information</li>
                            <li>Username and password</li>
                            <li>Payment information</li>
                            <li>Information about vehicles you are selling or interested in buying</li>
                            <li>Any other information you choose to provide</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>3. How We Use Your Information</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                            We use the information we collect about you for various purposes, including to:
                        </p>
                        <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices, updates, security alerts, and support messages</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Communicate with you about products, services, offers, and events</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>4. Sharing of Information</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            We may share information about you as follows or as otherwise described in this Privacy Policy:
                        </p>
                        <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                            <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
                            <li>If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to protect the rights, property, and safety of CarMine or others</li>
                            <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company</li>
                            <li>With your consent or at your direction</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>5. Data Security</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic communications transmission is ever fully secure or error-free.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>6. Your Choices</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            You may update, correct, or delete information about you at any time by logging into your online account or by emailing us. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>7. Changes to this Policy</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>8. Contact Us</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            If you have any questions about this privacy policy, please contact us at: privacy@carmine.com
                        </p>
                    </section>
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    )
}