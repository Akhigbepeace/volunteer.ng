"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/select-role");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-[500px] h-[100px]">
        <Image src="/assets/logo.png" alt="logo" fill priority />
      </div>
    </div>
  );
};

export default LandingPage;
