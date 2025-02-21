"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

      <main className="container mx-auto px-4 py-7 md:py-10">
        <h1
          className={`text-5xl md:text-7xl md:leading-tight font-bold text-center mb-12 text-transparent bg-clip-text ${
            darkMode
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
          }`}
        >
          Terms of Service
        </h1>

        <div className="max-w-4xl mx-auto space-y-8 prose prose-slate dark:prose-invert">
          <section>
            <h2 className="text-3xl font-bold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using CarMine (the &quot;Platform&quot;), you
              agree to be bound by these Terms of Service. If you disagree with
              any part of these terms, you may not access the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">2. User Accounts</h2>
            <p>
              To use certain features of the Platform, you must register for an
              account. You agree to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">3. Listing and Sales</h2>
            <p>When listing a vehicle for sale, you must:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>
                Provide accurate and detailed information about the vehicle
              </li>
              <li>Include clear, current photographs of the vehicle</li>
              <li>Disclose any known defects or issues</li>
              <li>Have the legal right to sell the vehicle</li>
              <li>Set fair and transparent pricing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">4. Transactions</h2>
            <p>
              CarMine facilitates transactions between buyers and sellers but is
              not a party to any transaction. Users agree to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>
                Complete all financial transactions through our secure payment
                system
              </li>
              <li>Pay all applicable fees and charges</li>
              <li>Follow our transaction safety guidelines</li>
              <li>Complete necessary documentation and transfers legally</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">
              5. Prohibited Activities
            </h2>
            <p>Users are prohibited from:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Posting fraudulent or misleading listings</li>
              <li>Manipulating prices or interfering with other listings</li>
              <li>Circumventing platform fees</li>
              <li>Harassing or discriminating against other users</li>
              <li>Using the platform for illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">
              6. Liability and Disclaimers
            </h2>
            <p>CarMine is not liable for:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>The condition or quality of vehicles listed</li>
              <li>Disputes between users</li>
              <li>Loss or damage resulting from platform use</li>
              <li>Technical issues or service interruptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">
              7. Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Users will
              be notified of significant changes, and continued use of the
              platform constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">8. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@carmine.com
              <br />
              Address: No. 123, Jalan Ampang, 50450 Kuala Lumpur, Selangor,
              Malaysia.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
