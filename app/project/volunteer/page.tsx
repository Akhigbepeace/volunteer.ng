"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/app/component/project/project-card";
import { Project } from "@/data/project";
import { getVolunteerProjectByStatus } from "@/lib/project";
import { toast, ToastContainer } from "react-toastify";

const TABS = ["Pending", "Accepted", "Rejected"];
// const TABS = ["Pending", "Applied", "Ongoing", "Completed", "Rejected"];
export type TabType =
  | "pending"
  | "applied"
  | "ongoing"
  | "completed"
  | "rejected";

const Projects = () => {
  const [activeTab, setActiveTab] = useState<TabType>("applied");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async (status: TabType) => {
    setLoading(true);

    try {
      const res = await getVolunteerProjectByStatus(status);
      setProjects(res.projects);
    } catch (error) {
      console.error(error);
      toast.error("Error getting projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects("pending");
  }, []);

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
            onClick={() => {
              setActiveTab(tab.toLowerCase() as TabType);

              fetchProjects(tab.toLowerCase() as TabType);
            }}
          >
            {tab} Projects
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
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
