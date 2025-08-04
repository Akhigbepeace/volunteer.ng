"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const allowedOrigins = [
  "https://volunteerng.vercel.app",
  "https://volunteer-ng.onrender.com",
  "http://localhost:3000",
];

export type Role = "volunteer" | "organization";

export const useGoogleAuth = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const verifyTokenAndRedirect = async (token: string, popup?: Window) => {
    setIsAuthenticating(true);
    try {
      // Step 5: Use token to make request to /dashboard
      const response = await fetch(
        "https://volunteer-ng.onrender.com/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        toast.error("Authentication failed");
        cookies.remove("authToken");
        popup?.close();
        return;
      }

      const data = await response.json();

      // Step 7: If user hasn't onboarded, redirect to /join
      if (!data.onboarded) {
        router.push("/join");
        popup?.close();
        return;
      }

      // Step 8: If user has onboarded, redirect based on role
      if (data.role === "volunteer") {
        router.push("/project/volunteer");
      } else if (data.role === "organization") {
        router.push("/project/organization");
      } else {
        // Fallback if role is not recognized
        toast.error("Unknown user role");
        router.push("/join");
      }

      // Step 9: Close popup on successful authentication and redirect
      popup?.close();
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Authentication failed. Please try again.");
      cookies.remove("authToken");
      popup?.close();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGoogleAuth = () => {
    // Step 1: User clicks login button, show popup
    setIsAuthenticating(true);

    // Step 2: Make request to /auth/google to handle OAuth
    const popup = window.open(
      "https://volunteer-ng.onrender.com/auth/google",
      "_blank",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    if (!popup) {
      toast.error("Popup blocked. Please allow popups for this site.");
      setIsAuthenticating(false);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data.token) {
        // Step 3: On successful authentication, get token
        const token = event.data.token;

        // Step 4: Save token for future requests
        cookies.set("authToken", token, { path: "/" });

        // Step 5-9: Verify token and redirect based on onboarding status
        verifyTokenAndRedirect(token, popup);
      } else if (event.data.error) {
        toast.error(event.data.error);
        setIsAuthenticating(false);
        popup.close();
      }

      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);

    // Handle popup closure (user manually closes or cancels)
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setIsAuthenticating(false);
        window.removeEventListener("message", handleMessage);
        // Don't show error if user just closed popup
      }
    }, 1000);
  };

  useEffect(() => {
    // Check if user already has token on component mount
    const token = cookies.get("authToken");
    if (token) {
      verifyTokenAndRedirect(token);
    }
  }, []);

  return {
    handleGoogleAuth,
    isAuthenticating,
  };
};
