"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/explore");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-[600px] h-full animate__animated animate__pulse">
        <Image
          src="/assets/icons/green-icon.png"
          alt="logo"
          fill
          priority
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default LandingPage;
