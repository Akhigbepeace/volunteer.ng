import React from "react";
import HomeNavbar from "../component/home-page-navbar";

const About = () => {
  return (
    <>
      <HomeNavbar />

      <div className="bg-tertiary min-h-screen text-secondary">
        <div
          className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/assets/about-hero.webp')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold text-center">
            About Volunteer.NG
          </h1>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-lg leading-relaxed">
            We believe that deep down, every African wants to make a difference—
            whether it's teaching a child to read, helping a small business
            grow, or cleaning up a neighborhood. But too often, that desire to
            serve gets lost in the shuffle of daily life or the challenge of
            finding the right opportunity.
          </p>
          <p className="text-lg leading-relaxed">
            That's where Volunteer.ng comes in. We're more than just a platform;
            we're a community of Africans who've decided that waiting for change
            isn't enough. We understand the frustration of wanting to help but
            not knowing where to start, and the struggle organizations face when
            they need skilled hands but can't find them.
          </p>
          <p className="text-lg leading-relaxed">
            So we created a space where your Tuesday evening free time can
            become a literacy lesson, your weekend a tree-planting mission, and
            your professional skills can help a nonprofit grow. When Africans
            come together with purpose, incredible things happen.
          </p>
        </div>
      </div>

      <footer className="bg-green-700 text-white text-center py-6 px-4">
        <p>© 2025 Volunteer.ng - Building Nigeria Through Service</p>
        <div className="mt-2 text-sm flex flex-wrap justify-center gap-4">
          <span>By Volint</span>
          <span>Secure & Private</span>
          <span>Made in Nigeria 🇳🇬</span>
        </div>
      </footer>
    </>
  );
};

export default About;
