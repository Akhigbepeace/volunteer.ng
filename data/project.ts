type Location = "remote" | "physical";

export type Project = {
  _id: string;
  image: string;
  type: string;
  duration: string;
  heading: string;
  orgName: string;
  description: string;
  causes: string[];
  skills: string[];
  creatorId?: "";
  status: "applied" | "ongoing" | "completed" | "rejected";
  location?: Location | null;
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
