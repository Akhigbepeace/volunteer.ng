import React from "react";
import ProjectCard from "../project";
import type { Project } from "../project";

const projects: Project[] = [
  {
    image: "/assets/cwi.jpeg",
    heading: "Clean Water Initiative",
    description:
      "Help with critical web development needs over the course of 4 weeks, in areas like maintaining or making critical updates to their website.",
    type: "Project",
    duration: "2 - 3Weeks",
    orgName: "Productive Living Board",
    category: "Diversity and Inclusion",
  },
  {
    image: "/assets/cwi.jpeg",
    heading: "Clean Water Initiative",
    description:
      "Help with critical web development needs over the course of 4 weeks, in areas like maintaining or making critical updates to their website.",
    type: "Project",
    duration: "2 - 3Weeks",
    orgName: "Productive Living Board",
    category: "Diversity and Inclusion",
  },
  {
    image: "/assets/cwi.jpeg",
    heading: "Clean Water Initiative",
    description:
      "Help with critical web development needs over the course of 4 weeks, in areas like maintaining or making critical updates to their website.",
    type: "Project",
    duration: "2 - 3Weeks",
    orgName: "Productive Living Board",
    category: "Diversity and Inclusion",
  },
  {
    image: "/assets/cwi.jpeg",
    heading: "Clean Water Initiative",
    description:
      "Help with critical web development needs over the course of 4 weeks, in areas like maintaining or making critical updates to their website.",
    type: "Project",
    duration: "2 - 3Weeks",
    orgName: "Productive Living Board",
    category: "Diversity and Inclusion",
  },
];
const Projects = () => {
  return (
    <section className="py-12 px-6 max-w-[1050px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-1">All Projects</h3>
          <p className="">Showing 1-18 of 46 opportunities</p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span>Sort By:</span>

            <select
              name="sort"
              id="sort"
              className="p-3 w-52 border rounded-md"
            >
              <option value="recommended">Recommended</option>
              <option value="mostRecent">Most Recent</option>
              <option value="name">Name (A - Z )</option>
            </select>
          </div>
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
