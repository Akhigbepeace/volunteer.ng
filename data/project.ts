type Type = "remote" | "physical" | "hybrid";

export type Project = {
  _id: string;
  image: string;
  type: Type | null;
  duration: string;
  heading: string;
  orgName: string;
  description: string;
  causes: string[];
  skills: string[];
  creatorId?: "";
  status: "applied" | "ongoing" | "completed" | "rejected";
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
