"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/app/component/project/project-card";
import { Project } from "@/data/project";
import { getVolunteerAppliedProjects } from "@/lib/project";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const TABS = ["Applied", "Ongoing", "Completed", "Rejected"];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Applied");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const cookies = new Cookies();
  const router = useRouter();
  const user = cookies.get("user");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      if (!user) {
        toast.error("Unauthenticated!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);

        return;
      }

      try {
        const res = await getVolunteerAppliedProjects(user.id);
        setProjects(res.projects);
      } catch (error) {
        console.error(error);
        toast.error("Error getting projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) => project.status === activeTab.toLowerCase()
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4">My Projects</h2>

      <div className="flex border-b mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium focus:outline-none ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Projects
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <p className="text-gray-500">
            No {activeTab.toLowerCase()} projects found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
