"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleAuth } from "@/hooks/use-popup-auth";

const Login = () => {
  const { handleGoogleAuth, isAuthenticating } = useGoogleAuth();

  return (
    <>
      <ToastContainer />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="space-y-4">
            <button
              onClick={handleGoogleAuth}
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center gap-10 py-2 px-4 border border-[#0077B5] rounded-md text-secondary hover:bg-gray-100 transition"
            >
              <FcGoogle size={24} />
              {isAuthenticating ? "Authenticating..." : "Sign in with Google"}
            </button>

            <div className="flex items-center justify-center text-center mt-5">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
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
