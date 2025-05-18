"use client";

import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { SiLinkedin } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

type UserData = {
  email: string;
  password: string;
};

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleOnChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLFormElement;

    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    const role = localStorage.getItem("role");

    try {
      e.preventDefault();

      toast("Account Created Successfully");

      if (role === "volunteer") {
        router.push("/onboarding/volunteer");
      } else {
        router.push("/onboarding/org");
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
    // if (email === "test@gmail.com" && password === "password") {
    // } else {
    //   alert("Invalid email or password");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex border border-gray-300 rounded-md shadow-sm px-3 py-2">
              <input
                required
                type={isVisible ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full focus:outline-none "
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleOnChange}
              />

              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="p-2"
              >
                {isVisible ? <IoEyeSharp /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
          >
            Signup
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
        <div className="space-y-4">
          <Link
            href="https://volunteer-ng.onrender.com/auth/google"
            className="w-full flex items-center justify-center gap-10 py-2 px-4 bg-transparent border border-[#0077B5] rounded-md text-secondary hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            Sign up with Google
          </Link>

          <Link
            href="https://volunteer-ng.onrender.com/auth/google"
            className="w-full flex items-center justify-center gap-10 py-2 px-4 bg-[#0077B5] border border-[#0077B5] rounded-md text-white hover:bg-opacity-80 transition"
          >
            <SiLinkedin color="white" size={24} />
            Sign up with LinkedIn
          </Link>

          <div className="flex items-center justify-center text-center mt-5">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
