"use client";

import Project from "@/app/component/project";
import { ProjectObj } from "@/app/home/volunteer/page";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ProjectStatus =
  | "published"
  | "applied"
  | "ongoing"
  | "completed"
  | "rejected";

const projects: ProjectObj[] = [
  {
    id: 1,
    image: "/assets/cwi.jpeg",
    status: "published",
    title: "Clean Water Initiative",
    description: "Help provide clean water to underprivileged communities.",
  },
  {
    id: 2,
    image: "/assets/tpc.jpeg",
    status: "applied",
    title: "Tree Planting Campaign",
    description: "Join us in planting trees to combat climate change.",
  },
  {
    id: 3,
    status: "ongoing",
    image: "/assets/literarcy-drive.jpeg",
    title: "Literacy Drive",
    description: "Help teach basic reading and writing skills.",
  },
  {
    id: 4,
    status: "completed",
    image: "/assets/fdp.jpeg",
    title: "Food Distribution Program",
    description: "Distribute food to families in need.",
  },
];

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<ProjectStatus>("published");

  const router = useRouter();

  const filteredProjects = projects.filter(
    (project) => project.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Volunteer Projects
        </h1>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-8">
          {["published", "applied", "ongoing", "completed", "rejected"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`py-2 px-4 rounded-lg ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-700"
                } transition`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Project List */}
        <div>
          {filteredProjects.length > 0 ? (
            <ul className="space-y-4">
              {filteredProjects.map((project) => (
                <Project
                  key={project.id}
                  project={project}
                  handleClick={() =>
                    router.push(`/dashboard/project/volunteer/${project.id}`)
                  }
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              No projects found for {activeTab}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
