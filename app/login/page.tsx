"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SiLinkedin } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleGoogleLogin = async () => {
    console.log("Google login clicked");
    // Integrate Google OAuth logic here
    // Example: router.push("/api/auth/google");
  };

  const handleLinkedInLogin = async () => {
    console.log("LinkedIn login clicked");
    // Integrate LinkedIn OAuth logic here
    // Example: router.push("/api/auth/linkedin");
  };

  const handleCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email === "test@gmail.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      toast("Logged in successfully");
      setFormData({ email: "", password: "" });
      router.push("/volunteer");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleCredentialLogin} className="space-y-4">
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                placeholder="Enter your email"
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
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  id="password"
                  name="password"
                  className="mt-1 block w-full focus:outline-none "
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  // className="absolute right-2 top-2"
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
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500">OR</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-10 py-2 px-4 bg-transparent border border-[#0077B5] rounded-md text-secondary hover:bg-gray-100 transition"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            <button
              onClick={handleLinkedInLogin}
              className="w-full flex items-center justify-center gap-10 py-2 px-4 bg-[#0077B5] border border-[#0077B5] rounded-md text-white hover:bg-opacity-80 transition"
            >
              <SiLinkedin color="white" size={24} />
              Sign in with LinkedIn
            </button>

            <div className="flex items-center justify-center text-center mt-5">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
