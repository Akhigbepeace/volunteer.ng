import type { FormData } from "@/app/component/suspense/apply";
import { Project } from "@/data/project";

type ProjectApplicationProps = {
  projectId: string;
  formData: FormData;
};

type CreateProjectProps = {
  project: Project;
};

type EditProjectProps = {
  projectId: string;
  project: Project;
};

type DeleteProjectProps = {
  projectId: string;
};

type CloudinaryRes = {
  secure_url: string;
  public_id: string;
};

type ProjectDetailsProps = {
  projectId: string;
};

type VolunteeerStatusProps = {
  projectId: string;
  volunteerId: string;
  status: "accepted" | "rejected";
};

const getProject = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

const getFilteredProject = async (queryParams: string) => {
  const url = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/projects?${queryParams.toString()}`;

  const apiRes = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

const getVolunteerAppliedProjects = async () => {
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user-joined-projects`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const getSingleProject = async (props: ProjectDetailsProps) => {
  const { projectId } = props;
  if (!projectId) return;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectId}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const updateVolunteerStatus = async (props: VolunteeerStatusProps) => {
  const { projectId, status, volunteerId } = props;
  if (!projectId) return;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-project-status`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        status,
        volunteerId,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const editProject = async (props: EditProjectProps) => {
  const { project, projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-project/${projectId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...project,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const deleteProject = async (props: DeleteProjectProps) => {
  const { projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/delete-project/${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const exitProject = async (props: DeleteProjectProps) => {
  const { projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/leave-project`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const createProject = async (props: CreateProjectProps) => {
  const { project } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-project-data`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...project,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const applyForProject = async (props: ProjectApplicationProps) => {
  const { formData, projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/join-project`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        ...formData,
      }),
    }
  );

  const res = await apiRes.json();

  return res;
};

const uploadImageToCloudinary = async (file: File): Promise<CloudinaryRes> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_preset");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dhs1b7iqo/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data;
};

export {
  getProject,
  applyForProject,
  updateVolunteerStatus,
  exitProject,
  createProject,
  editProject,
  deleteProject,
  getSingleProject,
  getFilteredProject,
  uploadImageToCloudinary,
  getVolunteerAppliedProjects,
};

export type { CloudinaryRes };
