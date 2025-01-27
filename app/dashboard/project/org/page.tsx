"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OrganizationProjectPage = () => {
  const categories = [
    { key: "published", label: "Published Projects" },
    { key: "created", label: "Created Projects" },
    { key: "active", label: "Active Projects" },
  ];

  const [activeTab, setActiveTab] = useState("published");

  // const router = useRouter();

  // const filteredProjects = projects.filter(
  //   (project) => project.status === activeTab
  // );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <Link
          href="/dashboard/project/org/create-project"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition text-center"
        >
          Create New Project
        </Link>
      </div>

      <div className="flex space-x-4 border-b mb-6">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveTab(category.key)}
            className={`py-2 px-4 ${
              activeTab === category.key
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      {/* 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Project
              key={project.id}
              project={project}
              // handleClick={() =>
              //   router.push(`/dashboard/project/org/${project.id}`)
              // }
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No projects available in this category.
          </p>
        )}
      </div> */}
    </div>
  );
};

export default OrganizationProjectPage;
