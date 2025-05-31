import { Project } from "@/data/project";

type CreateProjectProps = {
  userId: string;
  project: Project;
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
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await apiRes.json();
  return res;
};

const editProject = async (props: CreateProjectProps) => {
  const { userId, project } = props;

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-project-data`,
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

const deleteProject = async (projectId: string) => {
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-project-data/${projectId}`,
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

const uploadImageToCloudinary = async (file: File): Promise<string> => {
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
