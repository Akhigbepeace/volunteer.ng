import { Project } from "@/data/project";

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

const getProject = async () => {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await apiRes.json();
  return res;
};

const getSingleProject = async (projectId: string) => {
  if (!projectId) return;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectId}`,
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
  createProject,
  editProject,
  deleteProject,
  getSingleProject,
  uploadImageToCloudinary,
};

export type { CloudinaryRes };
