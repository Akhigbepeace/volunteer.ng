import Image from "next/image";
import React from "react";

const HeroSection = () => {
  const heroImage = "/assets/hero.jpeg";

  return (
    <div className="relative w-full">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
        <Image src={heroImage} alt="hero" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 bg-black/70 px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          Facilitating Social Impact
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-extralight text-white">
          Skill and passion based volunteering
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
