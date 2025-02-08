import React from "react";
import HeroSection from "../component/organisms/hero-section";
import FilterOptions from "../component/organisms/filter-options";
import Projects from "../component/organisms/projects";

const Explore = () => {
  return (
    <div>
      <HeroSection />
      <FilterOptions />
      <Projects />
    </div>
  );
};

export default Explore;
