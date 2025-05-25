"use client";

import React, { useEffect } from "react";
import HeroSection from "../component/organisms/hero-section";
import FilterOptions from "../component/organisms/filter-options";
import Projects from "../component/organisms/projects";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

const Explore = () => {
  const searchParams = useSearchParams();
  const cookies = new Cookies();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      cookies.set("user", { id: userId }, { path: "/" });
    }
  }, [userId]);

  return (
    <div>
      <HeroSection />
      <FilterOptions />
      <Projects />
    </div>
  );
};

export default Explore;
