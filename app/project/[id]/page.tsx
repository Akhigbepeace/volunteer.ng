"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLogoBuffer } from "react-icons/io5";

import AboutOrg from "@/app/component/project/about-org";
import ProjectCard from "@/app/component/project/project-card";
import Details from "@/app/component/project/project-detail";

import {
  deleteProject,
  exitProject,
  getProject,
  getSingleProject,
} from "@/lib/project";
import { getUser } from "@/lib/user";
import { Project } from "@/data/project";
import Loader from "@/app/component/loader";

const ProjectDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [role, setRole] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const cookies = new Cookies();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string | undefined;
  const user = cookies.get("user");

  useEffect(() => {
    const initialize = async () => {
      if (!projectId) {
        toast.error("Project ID not found.");
        setTimeout(() => {
          router.push("/project/organization");
        }, 3000);
        return;
      }

      try {
        setIsLoading(true);

        const [userData, projectData, projectList] = await Promise.all([
          getUser(user.id),
          getSingleProject(projectId),
          getProject(),
        ]);

        setRole(userData.role);
        setProject(projectData);
        setProjects(projectList);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [projectId]);

  const handleEdit = () => router.push(`/project/edit/${projectId}`);

  const handleDeleteProject = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteProject({
        projectId: projectId as string,
        userId: user.id,
      });

      if (res.success) {
        toast.success(res.message || "Project deleted successfully.");

        setTimeout(() => {
          router.push("/project/organization");
        }, 3000);
      } else {
        toast.error(res.message || "Failed to delete project.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExitProject = async () => {
    try {
      setIsExiting(true);
      const res = await exitProject({
        projectId: projectId as string,
        userId: user.id,
      });

      if (res.user) {
        toast.success(res.message || "Exited project successfully.");

        setTimeout(() => {
          router.push("/project/volunteer");
        }, 3000);
      } else {
        toast.error(res.message || "Failed to exit project.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsExiting(false);
    }
  };

  const formatDateToReadable = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const month = new Intl.DateTimeFormat("en-US", options).format(date);
    const day = date.getDate();
    const getOrdinalSuffix = (n: number): string => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  };

  const isOrganization = role === "organization";
  const isVolunteer = role === "volunteer";

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (!project)
    return (
      <div className="text-center mt-10">Project not found. Redirecting</div>
    );

  return (
    <div className="max-w-[1000px] mx-auto py-5 px-4">
      <ToastContainer />

      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-primary text-lg flex items-center gap-2"
        >
          <IoMdArrowRoundBack size={25} /> Back
        </button>

        {isVolunteer && (
          <button
            onClick={handleExitProject}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {isExiting ? <Loader /> : "Exit"}
          </button>
        )}

        {isOrganization && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDeleteProject}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              {isDeleting ? <Loader /> : " Delete"}
            </button>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold mt-3">{project.heading}</h1>
      <p className="text-gray-600 mt-2">{project.description}</p>

      {/* Uncomment and customize the section below when needed */}
      <div className="flex flex-col md:flex-row mt-5 gap-6">
        <div className="md:w-2/3">
          <Image
            src={project.image || "/assets/cwi.jpeg"}
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
            <ul className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {project.requirements?.map((requirement, index) => (
                <li key={index} className="list-disc list-inside">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-500 text-sm">
            Posted {formatDateToReadable(project.createdAt as string)}
          </p>

          {!isOrganization && (
            <Link
              href={
                user?.role === "volunteer"
                  ? "/signup"
                  : `/project/apply?project=${project.heading}&projectId=${project._id}`
              }
              className="bg-secondary text-white py-2 px-4 rounded-lg text-lg text-center"
            >
              Apply now
            </Link>
          )}
        </div>
      </div>

      {/* Uncomment when ready */}
      <Details />
      <AboutOrg />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {projects.map((proj, index) => (
          <ProjectCard key={index} project={proj} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
