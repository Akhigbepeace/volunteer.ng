import React from "react";
import ProjectCard from "../project/project-card";
import { projects } from "@/data/project";

const Projects = () => {
  return (
    <section className="py-12 px-6 max-w-[1050px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Section - Title & Project Count */}
        <div>
          <h3 className="text-xl font-bold mb-1">All Projects</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing 1-18 of 46 opportunities
          </p>
        </div>

        {/* Right Section - Sorting Options */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-start w-full sm:w-auto">
          <span className="text-gray-700 text-sm md:text-base whitespace-nowrap">
            Sort By:
          </span>
          <select
            name="sort"
            id="sort"
            className="p-3 w-full sm:w-52 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
          >
            <option value="recommended">Recommended</option>
            <option value="mostRecent">Most Recent</option>
            <option value="name">Name (A - Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
