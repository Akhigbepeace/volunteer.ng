import { Project } from "@/data/project";

type CreateProjectProps = {
  userId: string;
  project: Project;
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

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/save-project-data`,
    {
      method: "POST",
      body: formData,
    }
  );

  const res = await apiRes.json();
  return res;
};

export { createProject, uploadImage };
