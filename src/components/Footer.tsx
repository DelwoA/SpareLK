import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">SpareLK</span>
            </div>
            <p className="mb-5 text-sm">
              Your trusted marketplace for quality auto parts. Buy and sell with
              confidence.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>12/B, Lake Road, Colombo 1, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>+94 770 673892</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-orange-500" />
                <span>mailto@sparelk.com</span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-orange-500 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/seller-form"
                  className="hover:text-orange-500 transition-colors"
                >
                  Sell Parts
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-orange-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">
              Top Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/shop?category=engine"
                  className="hover:text-orange-500 transition-colors"
                >
                  Engine Parts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=body"
                  className="hover:text-orange-500 transition-colors"
                >
                  Body Parts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=lighting"
                  className="hover:text-orange-500 transition-colors"
                >
                  Lighting & Indicators
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=brake"
                  className="hover:text-orange-500 transition-colors"
                >
                  Brake Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=wheels"
                  className="hover:text-orange-500 transition-colors"
                >
                  Wheels & Tires
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=electrical"
                  className="hover:text-orange-500 transition-colors"
                >
                  Electrical Components
                </Link>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates on new products and special
              promotions
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-l-md border-0 bg-slate-800 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
              />
              <button className="rounded-r-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500">
                Subscribe
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} SpareLK. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              to="/privacy"
              className="hover:text-orange-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-orange-500 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-orange-500 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
