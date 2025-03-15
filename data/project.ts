export type Project = {
  id: number | string;
  image: string;
  type: string;
  duration: string;
  heading: string;
  orgName: string;
  description: string;
  category: string;
  status: "applied" | "ongoing" | "completed" | "rejected";
  location?: string;
  startDate?: string;
  endDate?: string;
  requirements?: string[];
  benefits?: string[];
  contactEmail?: string;
  contactPhone?: string;
  maxVolunteers?: number;
  tags?: string[];
  createdAt?: string;
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
    location: "Lagos, Nigeria",
    startDate: "2025-03-01",
    endDate: "2025-03-21",
    requirements: ["Basic HTML & CSS knowledge", "Responsive design skills"],
    benefits: ["Volunteer Certificate", "Networking opportunities"],
    contactEmail: "info@plb.org",
    maxVolunteers: 10,
    tags: ["Remote", "Web Development"],
    createdAt: "2025-02-15",
  },
  {
    id: 2,
    image: "/assets/environment.png",
    heading: "Environmental Awareness Campaign",
    description:
      "Engage in activities that promote environmental sustainability and awareness among the local community.",
    type: "Project",
    duration: "4 Weeks",
    orgName: "Green Earth Initiative",
    category: "Environment",
    status: "ongoing",
    location: "Nairobi, Kenya",
    startDate: "2025-02-10",
    endDate: "2025-03-10",
    requirements: ["Public speaking skills", "Passion for sustainability"],
    benefits: ["Certificate", "Community impact"],
    contactEmail: "volunteer@greenearth.org",
    maxVolunteers: 20,
    tags: ["In-Person", "Sustainability"],
    createdAt: "2025-01-20",
  },
  {
    id: 3,
    image: "/assets/mentorship.png",
    heading: "Youth Mentorship Program",
    description:
      "Provide mentorship and career guidance to underprivileged youth, helping them develop key skills for the future.",
    type: "Project",
    duration: "6 Weeks",
    orgName: "Youth Empowerment Foundation",
    category: "Education",
    status: "completed",
    location: "Remote",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    requirements: ["Mentorship experience", "Professional skills in any field"],
    benefits: ["Volunteer Certificate", "Professional growth"],
    contactEmail: "mentorship@yef.org",
    maxVolunteers: 15,
    tags: ["Remote", "Education"],
    createdAt: "2024-10-10",
  },
  {
    id: 4,
    image: "/assets/disaster-relief.png",
    heading: "Disaster Relief Support",
    description:
      "Assist in providing relief and support to communities affected by natural disasters, including food and shelter distribution.",
    type: "Project",
    duration: "2 - 4 Weeks",
    orgName: "Global Relief Network",
    category: "Humanitarian Aid",
    status: "rejected",
    location: "Port-au-Prince, Haiti",
    startDate: "2025-05-01",
    endDate: "2025-06-01",
    requirements: ["Physical fitness", "Experience in disaster response"],
    benefits: ["Community impact", "Hands-on humanitarian experience"],
    contactEmail: "support@grn.org",
    maxVolunteers: 50,
    tags: ["In-Person", "Emergency Response"],
    createdAt: "2025-04-15",
  },
  {
    id: 5,
    image: "/assets/animal-rescue.png",
    heading: "Animal Rescue & Shelter Support",
    description:
      "Help rescue, rehabilitate, and care for abandoned or injured animals in our local shelter.",
    type: "Project",
    duration: "3 Months",
    orgName: "Paw Rescue Foundation",
    category: "Animal Welfare",
    status: "ongoing",
    location: "Cape Town, South Africa",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    requirements: ["Animal handling experience", "Compassion for animals"],
    benefits: ["Volunteer Certificate", "Experience in animal care"],
    contactEmail: "volunteer@pawrescue.org",
    maxVolunteers: 25,
    tags: ["In-Person", "Animal Welfare"],
    createdAt: "2025-01-05",
  },
];
