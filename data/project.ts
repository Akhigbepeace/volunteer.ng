export type Project = {
  id: number;
  image: string;
  type: string;
  duration: string;
  heading: string;
  orgName: string;
  description: string;
  category: string;
  status: "applied" | "ongoing" | "completed" | "rejected";
};

export const projects: Project[] = [
  {
    id: 1,
    image: "/assets/cwi.jpeg",
    heading: "Clean Water Initiative",
    description:
      "Help with critical web development needs over the course of 4 weeks, in areas like maintaining or making critical updates to their website.",
    type: "Project",
    duration: "2 - 3 Weeks",
    orgName: "Productive Living Board",
    category: "Diversity and Inclusion",
    status: "applied",
  },
  {
    id: 2,
    image: "/assets/cwi.jpeg",
    heading: "Environmental Awareness Campaign",
    description:
      "Engage in activities that promote environmental sustainability and awareness among the local community.",
    type: "Project",
    duration: "4 Weeks",
    orgName: "Green Earth Initiative",
    category: "Environment",
    status: "ongoing",
  },
  {
    id: 3,
    image: "/assets/cwi.jpeg",
    heading: "Youth Mentorship Program",
    description:
      "Provide mentorship and career guidance to underprivileged youth, helping them develop key skills for the future.",
    type: "Project",
    duration: "6 Weeks",
    orgName: "Youth Empowerment Foundation",
    category: "Education",
    status: "completed",
  },
  {
    id: 4,
    image: "/assets/cwi.jpeg",
    heading: "Disaster Relief Support",
    description:
      "Assist in providing relief and support to communities affected by natural disasters, including food and shelter distribution.",
    type: "Project",
    duration: "2 - 4 Weeks",
    orgName: "Global Relief Network",
    category: "Humanitarian Aid",
    status: "rejected",
  },
];
