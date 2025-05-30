"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Project } from "@/data/project";

type ProjectProps = {
  project: Project;
};

const ProjectCard = (props: ProjectProps) => {
  const { project } = props;

  return (
    <Link
      href={`/project/${project._id}`}
      className="group border rounded-lg shadow-md overflow-hidden bg-white relative cursor-pointer"
    >
      <div className="relative w-full h-40">
        <Image
          src={project.image}
          alt={project.heading}
          fill
          className="object-cover"
        />
      </div>

      <div className="cursor-pointer">
        <div className="p-4">
          <div className="flex items-center divide-x text-gray-600 text-xs divide-black gap-2 uppercase">
            <h6>{project.type}</h6>
            <h6 className="pl-2">{project.duration}</h6>
          </div>

          <h2 className="my-3 font-bold text-xl">{project.heading}</h2>
          <p className="font-bold text-sm text-gray-600">{` for ${project.orgName}`}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-white">
          <p className="p-4 text-sm font-bold opacity-70">
            {project.description}
          </p>
          <p className="bg-gray-200 font-semibold text-sm w-full py-2 px-4">
            {project.category}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
