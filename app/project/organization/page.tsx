"use client";

import React, { useState } from "react";
import { projects } from "@/data/project";
import ProjectCard from "@/app/component/project/project-card";
import Link from "next/link";

type FilterStatus = "all" | "ongoing" | "completed" | "applied";
type SortOption = "newest" | "oldest" | "az" | "za";

const OrganizationProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const filteredProjects = projects
    .filter((project) =>
      searchQuery
        ? project.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((project) =>
      filterStatus === "all" ? true : project.status === filterStatus
    )
    .sort((a, b) => {
      if (sortOption === "newest") return Number(b.id) - Number(a.id);
      if (sortOption === "oldest") return Number(a.id) - +b.id;
      if (sortOption === "az") return a.heading.localeCompare(b.heading);
      if (sortOption === "za") return b.heading.localeCompare(a.heading);
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organization Projects</h1>
        <Link
          href="/project/create"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Create Project
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="applied">Applied</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationProjects;
