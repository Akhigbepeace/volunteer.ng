"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type Project = {
  id: string;
  image: string;
  title: string;
  description: string;
  yearsOfExperience: number;
  requirements: string[];
};

const fetchProject = async (id: string) => {
  // Example API simulation
  const projects: Project[] = [
    {
      id: "1",
      image: "/assets/cwi.jpeg",
      title: "Clean Water Initiative",
      description: "Help provide clean water to underprivileged communities.",
      yearsOfExperience: 2,
      requirements: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      id: "2",
      image: "/assets/tpc.jpeg",
      title: "Tree Planting Campaign",
      description: "Join us in planting trees to combat climate change.",
      yearsOfExperience: 3,
      requirements: ["Python", "SQL", "Machine Learning"],
    },
    {
      id: "3",
      image: "/assets/literarcy-drive.jpeg",
      title: "Literacy Drive",
      yearsOfExperience: 1,
      description: "Help teach basic reading and writing skills.",
      requirements: ["Java", "Spring Boot", "MySQL"],
    },
    {
      id: "4",
      image: "/assets/fdp.jpeg",
      title: "Food Distribution Program",
      yearsOfExperience: 4,
      description: "Distribute food to families in need.",
      requirements: ["React", "Node.js", "MongoDB"],
    },
  ];

  return projects.find((proj) => proj.id === id) || null;
};

const defaultProject: Project = {
  id: "",
  image: "",
  title: "",
  description: "",
  yearsOfExperience: 0,
  requirements: [],
};

const ProjectDescription = () => {
  const params = useParams();
  const { id } = params;

  const [project, setProject] = useState<Project>(defaultProject);

  const router = useRouter();

  useEffect(() => {
    const handleFetchProject = async () => {
      const project = await fetchProject(id as string);

      if (!project) {
        router.push("/dashboard/project/org");
        return null;
      }

      setProject(project as Project);
    };

    handleFetchProject();
  }, []);

  const handleApply = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      window.open("/login", "_self"); // Redirect to login page
    } else {
      window.open("https://calendar.google.com/calendar/", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Showcase Image */}
      <div className="relative w-full h-72">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Project Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {project.title}
          </h1>

          {/* Years of Experience */}
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Years of Experience:</span>{" "}
            {project.yearsOfExperience} years
          </p>

          {/* Project Description */}
          <p className="text-gray-700 mb-6">{project.description}</p>

          {/* Requirements */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Requirements
          </h2>
          <ul className="list-disc pl-5 text-gray-700 mb-6">
            {project.requirements.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
