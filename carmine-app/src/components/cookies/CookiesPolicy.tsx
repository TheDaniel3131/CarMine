"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
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
        onLogout={() => console.log("Logout clicked")} // Add a dummy logout function
      />

      <main className="container mx-auto px-4 py-7 md:py-10">
        <h1
          className={`text-5xl md:text-7xl md:leading-tight font-bold text-center mb-12 text-transparent bg-clip-text ${
            darkMode
              ? "bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400"
              : "bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600"
          }`}
        >
          Cookies Policy
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              What Are Cookies
            </h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Cookies are small text files that are stored on your computer or
              mobile device when you visit our website. They help us make your
              experience better by remembering your preferences and
              understanding how you use our platform.
            </p>
          </section>

          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              How We Use Cookies
            </h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              We use different types of cookies for different purposes:
            </p>

            <h3
              className={`text-2xl font-semibold mt-6 mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Necessary Cookies
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              These cookies are essential for the website to function properly.
              They enable basic functions like page navigation and access to
              secure areas of the website. The website cannot function properly
              without these cookies.
            </p>

            <h3
              className={`text-2xl font-semibold mt-6 mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Functional Cookies
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              These cookies enable us to provide enhanced functionality and
              personalization. They may be set by us or by third-party providers
              whose services we have added to our pages. If you do not allow
              these cookies, some or all of these services may not function
              properly.
            </p>

            <h3
              className={`text-2xl font-semibold mt-6 mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Analytics Cookies
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously. This
              helps us improve our website structure and content.
            </p>

            <h3
              className={`text-2xl font-semibold mt-6 mb-3 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Marketing Cookies
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              These cookies are used to track visitors across websites. The
              intention is to display ads that are relevant and engaging for the
              individual user.
            </p>
          </section>

          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Specific Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full mt-4">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie Name</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">session_id</td>
                    <td>Necessary</td>
                    <td>Maintains user session</td>
                    <td>Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">preferences</td>
                    <td>Functional</td>
                    <td>Stores user preferences</td>
                    <td>1 year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">_ga</td>
                    <td>Analytics</td>
                    <td>Google Analytics tracking</td>
                    <td>2 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">_fbp</td>
                    <td>Marketing</td>
                    <td>Facebook pixel tracking</td>
                    <td>3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Managing Cookies
            </h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your computer and you can set most
              browsers to prevent them from being placed. However, if you do
              this, you may have to manually adjust some preferences every time
              you visit our site and some services and functionalities may not
              work.
            </p>
          </section>

          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Updates to This Policy
            </h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              We may update this Cookie Policy from time to time. We encourage
              you to periodically review this page for the latest information on
              our cookie practices.
            </p>
          </section>

          <section>
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Contact Us
            </h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              If you have any questions about our use of cookies, please contact
              us at:
              <br />
              Email: privacy@carmine.com
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
