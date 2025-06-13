"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "../organisms/hero-section";
import FilterOptions from "../organisms/filter-options";
import Projects from "../organisms/projects";
import { getProject } from "@/lib/project";
import { toast } from "react-toastify";
import { Project } from "@/data/project";

const ExploreContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const res = await getProject();
        setProjects(res.projects);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <HeroSection />
      <FilterOptions setLoading={setLoading} setProjects={setProjects} />
      {loading ? <div>Loading...</div> : <Projects projects={projects} />}
    </div>
  );
};

export default ExploreContent;
