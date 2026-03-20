"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLeaf } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext"; // ✅ Custom auth context

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // ✅ use context

  const linkClass = (href) =>
    `hover:text-green-700 transition duration-200 ${
      pathname === href
        ? "text-green-700 font-semibold border-b-2 border-green-700 pb-1"
        : "text-gray-700"
    }`;

  return (
    <nav className="bg-gradient-to-r from-green-100 to-green-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with Icon */}
          <div className="flex items-center space-x-2 text-green-700 font-extrabold text-xl">
            <FaLeaf className="text-green-600" />
            <Link href="/" className={linkClass("/")}>
              ShareBite
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/charity" className={linkClass("/charity")}>
              Charities
            </Link>
            <Link href="/volunteer" className={linkClass("/volunteer")}>
              Volunteers
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            <Link href="/food-stats" className={linkClass("/food-stats")}>
              Food-Stats
            </Link>
          </div>

          {/* CTA Buttons */}
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-full shadow hover:bg-green-700 transition duration-200 ${
                    pathname === "/login"
                      ? "bg-green-700 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`border border-green-600 px-4 py-2 rounded-full hover:bg-green-100 transition duration-200 ${
                    pathname === "/register"
                      ? "bg-green-100 text-green-800 font-semibold"
                      : "text-green-700"
                  }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-green-800 font-semibold">
                  Welcome, {user.name || user.email}
                </span>

                {user.role === "donor" && (
                  <Link
                    href="/garden"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  >
                    🌳 Track My Tree
                  </Link>
                )}

                <Link
                  href="/donate"
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Donate
                </Link>

                <button
                  onClick={logout}
                  className="px-4 py-2 border border-green-600 rounded-full text-green-700 hover:bg-green-100 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
