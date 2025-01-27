"use client";

import React, { useState } from "react";

type ProjectStatus =
  | "published"
  | "applied"
  | "ongoing"
  | "completed"
  | "rejected";

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<ProjectStatus>("published");

  // const router = useRouter();

  // const filteredProjects = projects.filter(
  //   (project) => project.status === activeTab
  // );

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
        {/* <div>
          {filteredProjects.length > 0 ? (
            <ul className="space-y-4">
              {filteredProjects.map((project) => (
                <Project
                  key={project.id}
                  project={project}
                  // handleClick={() =>
                  //   router.push(`/dashboard/project/volunteer/${project.id}`)
                  // }
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              No projects found for {activeTab}.
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ProjectsPage;
