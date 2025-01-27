import React from "react";
import Navbar from "../component/navbar";
import HeroSection from "../component/organisms/hero-section";
import FilterOptions from "../component/organisms/filter-options";
import Projects from "../component/organisms/projects";

const Explore = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FilterOptions />
      <Projects />
    </div>
  );
};

export default Explore;
