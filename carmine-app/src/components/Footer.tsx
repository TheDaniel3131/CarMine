import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FooterProps } from "@/lib/interfaces";

export default function Footer({ darkMode }: FooterProps) {
  const socialLinks = {
    facebook: "https://facebook.com/carmine",
    instagram: "https://instagram.com/carmine",
    twitter: "https://twitter.com/carmine",
  };

  return (
    <footer
      className={`${
        darkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900"
          : "bg-gradient-to-r from-blue-600 to-purple-600"
      } text-white py-12`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">About CarMine</h3>
            <p className={darkMode ? "text-gray-300" : "text-blue-100"}>
              Revolutionizing the automotive industry with cutting-edge
              technology and user-centric services.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "About",
                "Contact",
                "FAQ",
                "Privacy Policy",
                "Cookies",
                "Terms of Services",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${
                      item === "Terms of Services"
                        ? "tos"
                        : item.toLowerCase().replace(" ", "")
                    }`}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-blue-100 hover:text-white"
                    } transition-colors`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {["Marketplace", "Sell"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-blue-100 hover:text-white"
                    } transition-colors`}
                  >
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
                {
                  name: "Facebook",
                  icon: Facebook,
                  link: socialLinks.facebook,
                },
                {
                  name: "Instagram",
                  icon: Instagram,
                  link: socialLinks.instagram,
                },
                { name: "Twitter", icon: Twitter, link: socialLinks.twitter },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.link}
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-blue-100 hover:text-white"
                  } transition-colors`}
                  aria-label={platform.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <platform.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`text-center ${
            darkMode
              ? "text-gray-400 border-t border-gray-700"
              : "text-blue-100 border-t border-blue-400"
          } pt-8`}
        >
          <p>&copy; {new Date().getFullYear()} CarMine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
