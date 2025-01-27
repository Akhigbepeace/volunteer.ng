"use client";

import Image from "next/image";
import React from "react";

export type ProjectObj = {
  id: number;
  status:
    | "published"
    | "applied"
    | "ongoing"
    | "completed"
    | "rejected"
    | "active"
    | "created";
  image: string;
  title: string;
  description: string;
};

const Home = () => {
  return (
    <div>
      <section className="relative h-[400px]">
        <div className="relative w-full h-[400px]">
          <Image
            src="/assets/showcase.jpeg"
            alt="showcase"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">
            Join Our Volunteer Projects
          </h1>
          <p className="text-lg max-w-2xl">
            Make a meaningful difference by participating in community projects.
            Together, we can create lasting change.
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Available Projects
        </h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              // handleClick={() => handleApply(project.id)}
            />
          ))}
        </div> */}
      </section>
    </div>
  );
};

export default Home;
