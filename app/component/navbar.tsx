"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

type MenuOptions = {
  title: string;
  path: string;
};

type Navlinks = {
  title: string;
  menuOptions: MenuOptions[];
};

const Navbar = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Navlinks[] = [
    {
      title: "For Volunteers",
      menuOptions: [{ title: "Explore Volunteers", path: "/explore" }],
    },
    {
      title: "For Organization",
      menuOptions: [{ title: "Post Project", path: "/project/create" }],
    },
  ];

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md px-4 md:px-6 py-4">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/explore" className="relative w-[200px] h-[50px]">
          <Image
            src="/assets/logos/full-white.png"
            alt="Logo"
            fill
            priority
            className="object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 font-bold text-white">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              <div
                onClick={() => toggleMenuOption(index)}
                className="flex cursor-pointer items-center gap-1"
              >
                <span>{link.title}</span>
                <FaChevronDown size={15} />
              </div>

              {openMenuIndex === index && (
                <div className="absolute left-0 bg-white p-3 px-5 rounded-xl text-black text-sm mt-2 shadow-md">
                  {link.menuOptions.map((option) => (
                    <Link
                      key={option.path}
                      href={option.path}
                      className="block py-1"
                    >
                      {option.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/about">About</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-[1px] h-14 bg-white" />
          <Link
            href="/login"
            className="border border-white py-2 px-6 rounded-2xl text-white text-center"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-secondary border border-secondary py-2 px-6 rounded-2xl text-white text-center"
          >
            Join
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-primary p-5 shadow-lg flex flex-col items-center gap-4 text-white font-medium">
          {navLinks.map((link, index) => (
            <div key={index} className="w-full text-center">
              <div
                onClick={() => toggleMenuOption(index)}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{link.title}</span>
                <FaChevronDown size={15} />
              </div>

              {openMenuIndex === index && (
                <div className="bg-white p-3 rounded-xl text-black text-sm mt-2 shadow-md">
                  {link.menuOptions.map((option) => (
                    <Link
                      key={option.path}
                      href={option.path}
                      className="block py-1"
                    >
                      {option.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/about">About</Link>

          <div className="flex flex-col gap-3 w-full items-center">
            <Link
              href="/login"
              className="border border-white py-2 w-40 rounded-2xl text-white text-center"
            >
              Sign in
            </Link>
            <Link
              href="/join"
              className="bg-secondary border border-secondary py-2 w-40 rounded-2xl text-white text-center"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
