"use client";

import AboutOrg from "@/app/component/project/about-org";
import ProjectCard from "@/app/component/project/project-card";
import Details from "@/app/component/project/project-detail";
import { Project } from "@/data/project";
import { deleteProject, getProject, getSingleProject } from "@/lib/project";
import { getUser } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLogoBuffer } from "react-icons/io5";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const ProjectDetails = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const cookies = new Cookies();
  const router = useRouter();

  const user = cookies.get("user");

  const userId = user.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await getUser(userId);
        setRole(data.role);
      } catch (error) {
        toast.error(String(error));
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchSingleProject = async () => {
      if (!userId) return;

      setLoading(true);

      try {
        const res = await getSingleProject(project?._id as string);
        setProject(res.project);
      } catch (error) {
        toast.error(String(error));
      }
    };

    fetchSingleProject();
  }, [userId, project?._id]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const res = await getProject();
        setProjects(res);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = () => router.push(`/project/edit?id=${project?._id}`);

  const handleDelete = async () => {
    if (!project?._id) return;

    try {
      const res = await deleteProject(project._id);
      if (res) router.push("/project/organization");
    } catch (error) {
      toast.error(String(error));
    }
  };

  const isVolunteer = role === "volunteer";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1000px] mx-auto py-5 px-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-primary text-lg flex items-center gap-2"
        >
          <IoMdArrowRoundBack size={25} /> Back
        </button>

        {!isVolunteer && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>

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
          {isVolunteer && (
            <Link
              href={`/project/apply?project=${"Clean Water Initiative"}`}
              className="bg-secondary text-white py-2 px-4 rounded-lg text-lg text-center"
            >
              Apply now
            </Link>
          )}
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
