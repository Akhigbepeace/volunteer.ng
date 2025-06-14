"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProjectCard from "@/app/component/project/project-card";
import Details from "@/app/component/project/project-detail";
// import VolunteersSection from "@/app/component/project/volunteers-section";

import {
  deleteProject,
  exitProject,
  getProject,
  getSingleProject,
} from "@/lib/project";
import { getUser } from "@/lib/user";
import { Project, Volunteers } from "@/data/project";
import Loader from "@/app/component/loader";
import VolunteersSection from "@/app/component/project/volunters-section";

type ProjectAndVolunteers = {
  project: Project | null;
  volunteers: Volunteers[];
};

const ProjectDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [role, setRole] = useState<string>("");
  const [projectAndVolunteers, setProjectsAndVolunteers] =
    useState<ProjectAndVolunteers>({
      project: null,
      volunteers: [],
    });
  const [projects, setProjects] = useState<Project[]>([]);

  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string | undefined;

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
          getUser(),
          getSingleProject({ projectId }),
          getProject(),
        ]);

        setRole(userData.role);
        setProjectsAndVolunteers({
          project: projectData.project,
          volunteers: projectData.volunteers,
        });
        setProjects(projectList.projects);
      } catch (error) {
        console.log("Error getting project details", error);
        toast.error("Ooopss! Something went wrong");
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

  // New function to handle volunteer status updates
  const handleVolunteerStatusUpdate = async (
    volunteerId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      // You'll need to implement this function in your lib/project.ts
      // const res = await updateVolunteerStatus({
      //   projectId: projectId as string,
      //   volunteerId,
      //   status,
      //   userId: user.id,
      // });

      // For now, we'll update the local state
      setProjectsAndVolunteers((prev) => ({
        ...prev,
        volunteers: prev.volunteers.map((volunteer) =>
          volunteer._id === volunteerId ? { ...volunteer, status } : volunteer
        ),
      }));

      toast.success(`Volunteer ${status} successfully!`);
    } catch (error) {
      console.error("Error updating volunteer status:", error);
      toast.error("Failed to update volunteer status");
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
    // return "Hello";
  };

  const { project, volunteers } = projectAndVolunteers;

  const isOrganization = role === "organization";
  const isOwnersProject = project?.creatorId;

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

        {!isOrganization && (
          <div className="md:w-1/3 flex flex-col gap-4">
            {project.canApply && project.status === "pending" ? (
              <Link
                href={
                  role === "volunteer"
                    ? `/project/apply?projectTitle=${project.heading}&projectId=${project._id}&deadline=${project.deadline}`
                    : "/signup"
                }
                className="bg-secondary text-white py-2 px-4 rounded-lg text-lg text-center"
              >
                Apply now
              </Link>
            ) : (
              <button
                onClick={handleExitProject}
                className="px-4 py-2 bg-red-600 text-white rounded text-lg text-center"
              >
                {isExiting ? <Loader /> : "Exit Project"}
              </button>
            )}
          </div>
        )}

        {isOwnersProject && isOrganization && (
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
      <p className="text-gray-500 text-sm">
        Posted {formatDateToReadable(project.createdAt as string)}
      </p>

      {/* Project Image and Info Section */}
      <div className="flex flex-col md:flex-row mt-5 gap-6">
        <div className="relative w-full h-[800px]">
          <Image
            src={project.image || "/assets/cwi.jpeg"}
            alt="Project"
            fill
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>

      {/* Project Details */}
      <Details project={project} />

      {/* Volunteers Section - Only show to project owner */}
      {isOwnersProject && isOrganization && (
        <VolunteersSection
          volunteers={volunteers}
          isOwner={isOwnersProject}
          onStatusUpdate={handleVolunteerStatusUpdate}
        />
      )}

      {/* Related Projects */}
      {projects.length > 1 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Related Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects
              .filter((project) => project._id !== projectId)
              .map((proj, index) => (
                <ProjectCard key={index} project={proj} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
