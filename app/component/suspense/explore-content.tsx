"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "../organisms/hero-section";
import FilterOptions from "../organisms/filter-options";
import Projects from "../organisms/projects";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { getProject } from "@/lib/project";
import { toast } from "react-toastify";

const ExploreContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const cookies = new Cookies();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      cookies.set("user", { id: userId }, { path: "/" });
    }
  }, [userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const res = await getProject();
        setProjects(res);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeroSection />
      <FilterOptions />
      <Projects projects={projects} />
    </div>
  );
};

export default ExploreContent;
