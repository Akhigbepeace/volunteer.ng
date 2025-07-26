// hooks/useGoogleAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const allowedOrigins = [
  "https://volunteerng.vercel.app",
  "https://volunteer-ng.onrender.com",
  "http://localhost:3000",
];

export const useGoogleAuth = () => {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const verifyTokenAndRedirect = async (token: string) => {
    setIsAuthenticating(true);
    try {
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
        localStorage.removeItem("authToken");
        return;
      }

      const data = await response.json();

      if (data.onboarded && data.role === "volunteer") {
        router.push("/onboarding/volunteer");
      }

      // if (data.onboarded && data.isPaid) {
      //   router.push("/agent-dashboard");
      // } else if (!data.onboarded) {
      //   router.push("/register");
      // }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Authentication failed. Please try again.");
      localStorage.removeItem("authToken");
    } finally {
      setIsAuthenticating(false);
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
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data.token) {
        const token = event.data.token;
        localStorage.setItem("authToken", token);
        verifyTokenAndRedirect(token);
      } else if (event.data.error) {
        toast.error(event.data.error);
        setIsAuthenticating(false);
      }

      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);

    // const checkClosed = setInterval(() => {
    //   if (popup.closed) {
    //     clearInterval(checkClosed);a
    //     setIsAuthenticating(false);
    //     window.removeEventListener("message", handleMessage);
    //   }
    // }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) verifyTokenAndRedirect(token);
  }, []);

  return {
    handleGoogleAuth,
    isAuthenticating,
  };
};
