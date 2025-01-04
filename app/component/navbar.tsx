"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const role = localStorage.getItem("role");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isUserLoggedIn = localStorage.getItem("isLoggedIn");
      
      if (isUserLoggedIn === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image src="/assets/logo.png" alt="Logo" width={120} height={50} />
      </div>

      {!isLoggedIn ? (
        <ul className="flex ml-8 space-x-6 text-secondary">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link href="#features" className="hover:text-primary">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>
      ) : (
        <Link
          href={role === "volunteer" ? "/project/volunteer" : "/project/org"}
          className="hover:text-primary"
        >
          Projects
        </Link>
      )}

      {isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/user.png"
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-opaciry-80 transition"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
