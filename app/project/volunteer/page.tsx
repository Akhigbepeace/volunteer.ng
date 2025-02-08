"use client";

import React, { useState } from "react";
import ProjectCard from "@/app/component/project/project-card";
import { projects } from "@/data/project";

const TABS = ["Applied", "Ongoing", "Completed", "Rejected"];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Applied");

  const filteredProjects = projects.filter(
    (project) => project.status === activeTab.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto p-5">
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
