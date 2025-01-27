import Image from "next/image";
import React from "react";

const HeroSection = () => {
  const heroImage = "/assets/hero.jpeg";

  return (
    <div>
      <div className="relative h-[400px] w-full">
        <Image src={heroImage} alt="hero" fill objectFit="cover" />
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-5 text-white h-[400px] w-full bg-[rgba(0,0,0,0.8)] absolute top-24">
        <h1 className="font-black text-5xl">
          Facilitating social impact in Nigeria
        </h1>
        <p className="text-xl font-extralight">
          Skill and passion based volunteering
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
