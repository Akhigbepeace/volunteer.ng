"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/home" className="relative w-[200px] h-[50px]">
          <Image
            src="/assets/logos/green-and-black.png"
            alt="Logo"
            fill
            priority
            className="object-cover"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#how-it-works"
            className="text-gray-700 hover:text-green-700 transition"
          >
            About
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-700 hover:text-green-700 transition"
          >
            How It Works
          </Link>
          <Link
            href="#impact"
            className="text-gray-700 hover:text-green-700 transition"
          >
            Impact
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-700 hover:text-green-700 transition"
          >
            Stories
          </Link>

          <Link
            href="/explore"
            className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
          <Link
            href="#how-it-works"
            className="block text-gray-700 hover:text-green-700"
          >
            About
          </Link>
          <Link
            href="#how-it-works"
            className="block text-gray-700 hover:text-green-700"
          >
            How It Works
          </Link>
          <Link
            href="#impact"
            className="block text-gray-700 hover:text-green-700"
          >
            Impact
          </Link>
          <Link
            href="#testimonials"
            className="block text-gray-700 hover:text-green-700"
          >
            Stories
          </Link>

          <Link
            href="/explore"
            className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
