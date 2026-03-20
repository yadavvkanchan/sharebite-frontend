import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-100 text-green-800 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center space-x-2 text-2xl font-bold text-green-700">
            <FaHeart className="text-green-700" />
            <span>ShareBite</span>
          </div>
          <p className="mt-2 text-sm text-green-700">
            Serving smiles, one bite at a time. ❤️
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-green-600">Home</Link></li>
            <li><Link href="/donate" className="hover:text-green-600">Donate Food</Link></li>
            <li><Link href="/need-food" className="hover:text-green-600">Need Food</Link></li>
            <li><Link href="/about" className="hover:text-green-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect with Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-sm text-green-700 mt-10 border-t border-green-300 pt-4">
        © {new Date().getFullYear()} ShareBite. Made with 💚 to fight hunger.
      </div>
    </footer>
  );
};

export default Footer;
