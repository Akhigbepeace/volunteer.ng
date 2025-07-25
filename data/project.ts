type Type = "remote" | "physical" | "hybrid";

type Project = {
  _id: string;
  image: string;
  canApply?: boolean;
  type: Type | null;
  duration: string;
  heading: string;
  orgName: string;
  description: string;
  causes: string[];
  skills: string[];
  creatorId?: "";
  status:
    | "applied"
    | "ongoing"
    | "completed"
    | "published"
    | "rejected"
    | "pending";
  location: string[];
  numberOfHours: number;
  deadline: string;
  startDate?: string;
  endDate?: string;
  requirements?: string[];
  benefits?: string[];
  contactEmail?: string;
  contactPhone?: string;
  maxVolunteers?: number;
  createdAt?: string;
};

type Volunteers = {
  company: string;
  email: string;
  createdAt: string;
  name: string;
  experience: string;
  availability: string;
  qualifications: string;
  favorites: [];
  googleId: string;
  image: string;
  industry: string[];
  phone: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  projectsJoined: string[];
  requirements: [];
  role: string;
  school: string;
  skills: string[];
  updatedAt: string;
  __v: 4;
  _id: string;
};

export type { Project, Volunteers };
