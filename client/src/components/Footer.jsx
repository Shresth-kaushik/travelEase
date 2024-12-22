import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">TravelEase</h3>
            <p className="text-gray-400">Discover the world with us</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
            <p className="text-gray-400 mb-2">Stay updated with our latest offers</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-l-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

