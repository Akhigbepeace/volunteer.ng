import Image from "next/image";
import React from "react";
import { ProjectObj } from "../home/volunteer/page";

type ProjectProps = {
  project: ProjectObj;
  handleClick: () => void;
};

const Project = (props: ProjectProps) => {
  const { handleClick, project } = props;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      <div className="relative w-full h-40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <button
          onClick={handleClick}
          // onClick={() => handleApply(project.id)}
          className="w-full py-2 bg-primary text-white rounded hover:bg-secondary transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Project;
