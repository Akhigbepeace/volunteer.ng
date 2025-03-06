import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Volunteer.ng. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="text-gray-400 hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition">
            Terms of Service
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
