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

  const verifyTokenAndRedirect = async (token: string, popup?: Window | null) => {
    try {
      console.log("Making request to /dashboard with token");
      const response = await fetch("https://volunteer-ng.onrender.com/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid response");
      }

      const data = await response.json();
      console.log("Dashboard response:", data);

      // Redirect based on onboarding and role
      if (!data.onboarded) {
        router.push("/join");
      } else if (data.role === "volunteer") {
        router.push("/project/volunteer");
      } else if (data.role === "organization") {
        router.push("/project/organization");
      } else {
        toast.error("Unknown user role");
        router.push("/join");
      }

    } catch (err) {
      console.error("Authentication error:", err);
      toast.error("Authentication failed. Please login again.");
      cookies.remove("authToken");
    } finally {
      setIsAuthenticating(false);
      if (popup && !popup.closed) popup.close();
    }
  };

  const handleGoogleAuth = () => {
    setIsAuthenticating(true);

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
      console.log("Message received:", event);
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.token) {
        const token = event.data.token;
        cookies.set("authToken", token, { path: "/" });
        verifyTokenAndRedirect(token, popup);
      } else if (event.data?.error) {
        toast.error(event.data.error);
        if (!popup.closed) popup.close();
        setIsAuthenticating(false);
      }

      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);

    // Monitor if user closes the popup manually
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", handleMessage);
        if (isAuthenticating) {
          setIsAuthenticating(false);
          console.log("User closed popup");
        }
      }
    }, 1000);
  };

  useEffect(() => {
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