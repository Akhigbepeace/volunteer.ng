"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { getUser, User } from "@/lib/user";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import { handleUserLogout } from "@/lib/auth";

type MenuOptions = {
  title: string;
  path: string;
};

type Navlinks = {
  title: string;
  menuOptions: MenuOptions[];
};

const NavbarContent = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchParamsUserId, setSearchParamsUserId] = useState<string | null>(
    null
  );

  const [userData, setUserData] = useState<User | null>(null);

  const router = useRouter();
  const cookies = new Cookies();
  const searchParams = useSearchParams();
  const user = cookies.get("user");
  const userId = user?.id;

  const navLinks: Navlinks[] = React.useMemo(() => {
    if (!userData?.role) {
      return [
        {
          title: "For Volunteers",
          menuOptions: [{ title: "Explore Volunteers", path: "/explore" }],
        },
        {
          title: "For Organization",
          menuOptions: [{ title: "Post Project", path: "/project/create" }],
        },
      ];
    }

    return userData.role === "volunteer"
      ? [
          {
            title: "For Volunteers",
            menuOptions: [{ title: "Explore Volunteers", path: "/explore" }],
          },
        ]
      : [
          {
            title: "For Organization",
            menuOptions: [{ title: "Post Project", path: "/project/create" }],
          },
        ];
  }, [userData]);

  useEffect(() => {
    const id = searchParams.get("userId");
    if (id) {
      setSearchParamsUserId(id);
      cookies.set("user", { id }, { path: "/" });
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchUser = async () => {
      const id = searchParamsUserId || userId;
      if (!id) return;

      try {
        const data = await getUser(id);
        if (data?.email) {
          setUserData(data);
        } else {
          router.push("/explore");
        }
      } catch (error) {
        toast.error(String(error));
      }
    };

    fetchUser();
  }, [searchParamsUserId, userId]);

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLogout = async () => {
    try {
      await handleUserLogout();
      cookies.remove("user");
      setUserData(null);
      router.push("/login");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md px-4 md:px-6 py-4">
      <ToastContainer />
      <div className="flex justify-between items-center w-full">
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
              <button
                onClick={() => toggleMenuOption(index)}
                className="flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <span>{link.title}</span>
                <FaChevronDown size={15} />
              </button>

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
          {userData ? (
            <div className="flex items-center gap-4 text-white">
              <Image
                src={userData.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div>{userData.displayName || "User"}</div>
                <div className="text-sm opacity-80">{userData.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="border border-white py-2 px-6 rounded-2xl text-white"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-primary p-5 shadow-lg flex flex-col items-center gap-4 text-white font-medium">
          {navLinks.map((link, index) => (
            <div key={index} className="w-full text-center">
              <button
                onClick={() => toggleMenuOption(index)}
                className="flex items-center justify-center gap-2 cursor-pointer w-full"
              >
                <span>{link.title}</span>
                <FaChevronDown size={15} />
              </button>

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
            {userData ? (
              <>
                <span>{userData.displayName || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="border border-white py-2 w-40 rounded-2xl text-white text-center"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border border-white py-2 w-40 rounded-2xl text-white text-center"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-secondary border border-secondary py-2 w-40 rounded-2xl text-white text-center"
                >
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarContent;
