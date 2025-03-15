"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

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

  const navLinks: Navlinks[] = [
    {
      title: "For Volunteers",
      menuOptions: [
        {
          title: "Explore Volunteers",
          path: "/explore",
        },
      ],
    },
    {
      title: "For Organization",
      menuOptions: [
        {
          title: "Post Project",
          path: "/project/create",
        },
      ],
    },
  ];

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className="sticky top-0 z-20 grid grid-cols-3 px-6 items-center bg-primary shadow-md">
      <div className="flex items-center relative w-[250px] h-[100px]">
        <Image
          src="/assets/logos/full-white.png"
          alt="Logo"
          objectFit="cover"
          fill
          priority
        />
      </div>

      <div className="flex items-center gap-10 font-bold text-white">
        {navLinks.map((link, index) => {
          return (
            <div key={index} className="relative">
              <div
                onClick={() => toggleMenuOption(index)}
                className="flex cursor-pointer items-center gap-1"
              >
                <span>{link.title}</span>
                <FaChevronDown color="#FFF" size={15} />
              </div>

              {openMenuIndex === index && (
                <div className="absolute font-light bg-white p-3 px-5 rounded-xl text-black text-sm whitespace-nowrap mt-5">
                  {link.menuOptions.map((option) => {
                    return (
                      <Link key={option.path} href={option.path}>
                        {option.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <Link href="/about">About</Link>
      </div>

      <div className="flex items-center gap-4 justify-end">
        <div className="w-[1px] h-14 bg-white mr-20" />
        <Link
          href="/login"
          className="border border-white py-2 w-28 rounded-2xl text-white text-center"
        >
          Sign in
        </Link>
        <Link
          href="/join"
          className="bg-secondary border border-secondary py-2 w-28 rounded-2xl text-white text-center"
        >
          Join
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
