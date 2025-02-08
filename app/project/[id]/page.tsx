"use client";

import AboutOrg from "@/app/component/project/about-org";
import ProjectCard from "@/app/component/project/project-card";
import Details from "@/app/component/project/project-detail";
import { projects } from "@/data/project";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLogoBuffer } from "react-icons/io5";

const ProjectDetails = () => {
  const router = useRouter();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedIn = false;

  return (
    <div className="max-w-[1000px] mx-auto py-5 px-4">
      <button
        onClick={() => router.back()}
        className="text-primary text-lg flex items-center gap-2"
      >
        <IoMdArrowRoundBack size={25} /> Back
      </button>

      <h1 className="text-3xl font-bold mt-3">Clean Water Initiative</h1>

      <p className="text-gray-600 mt-2">
        Help with critical web development needs over the course of 4 weeks, in
        areas like maintaining or making critical updates to their website.
      </p>

      <div className="flex flex-col md:flex-row mt-5 gap-6">
        <div className="md:w-2/3">
          <Image
            src="/assets/cwi.jpeg"
            alt="Project"
            width={800}
            height={800}
            className="rounded-lg w-full"
          />
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="flex items-center gap-3 border p-4 rounded-lg shadow bg-white">
            <IoLogoBuffer size={45} />

            <div>
              <h2 className="font-semibold">Productive Living Board</h2>
              <p className="text-gray-500 text-sm">Charlottesville, VA, USA</p>
            </div>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm font-semibold">Cause</h4>
            <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
              Housing & Homelessness
            </span>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm font-semibold">Skills</h4>
            <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
              Graphic Design
            </span>
          </div>

          <p className="text-gray-500 text-sm">Posted February 6th</p>

          <Link
            href={isLoggedIn ? "" : "/login"}
            className="bg-secondary text-white py-2 px-4 rounded-lg text-lg text-center"
          >
            Apply now
          </Link>
        </div>
      </div>

      <Details />

      <AboutOrg />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
