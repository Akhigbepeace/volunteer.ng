import type { FormData } from "@/app/component/suspense/apply";
import { Project } from "@/data/project";

type ProjectApplicationProps = {
  userId: string;
  projectId: string;
  formData: FormData;
};

type CreateProjectProps = {
  userId: string;
  project: Project;
};

type EditProjectProps = {
  userId: string;
  projectId: string;
  project: Project;
};

type DeleteProjectProps = {
  userId: string;
  projectId: string;
};

type CloudinaryRes = {
  secure_url: string;
  public_id: string;
};

type ProjectDetailsProps = {
  projectId: string;
  userId: string;
};

const getProject = async (userId?: string) => {
  const url = userId
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/projects?userId=${encodeURIComponent(
        userId
      )}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/projects`;

  const apiRes = await fetch(url, {
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
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

const getVolunteerAppliedProjects = async (userId: string) => {
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user-joined-projects?userId=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const getSingleProject = async (props: ProjectDetailsProps) => {
  const { projectId, userId } = props;
  if (!projectId) return;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectId}?userId=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const editProject = async (props: EditProjectProps) => {
  const { userId, project, projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-project/${projectId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        ...project,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const deleteProject = async (props: DeleteProjectProps) => {
  const { projectId, userId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/delete-project/${userId}/${projectId}`,
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
  const { projectId, userId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/leave-project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        projectId,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const createProject = async (props: CreateProjectProps) => {
  const { userId, project } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-project-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        ...project,
      }),
    }
  );

  const res = await apiRes.json();
  return res;
};

const applyForProject = async (props: ProjectApplicationProps) => {
  const { formData, userId, projectId } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/join-project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
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
