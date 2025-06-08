"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/app/component/project/project-card";
import Link from "next/link";
import { Project } from "@/data/project";
import { getProject } from "@/lib/project";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

type TabOption = "published" | "ongoing" | "completed";
type SortOption = "newest" | "oldest" | "az" | "za";

const projectTab = ["published", "ongoing", "completed"] as TabOption[];

const OrganizationProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabOption>("published");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [projects, setProjects] = useState<Project[]>([]);

  const router = useRouter();
  const cookies = new Cookies();
  const user = cookies.get("user");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      if (!user) {
        toast.error("Unauthenticated!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);

        return;
      }

      try {
        const res = await getProject(user.id);
        setProjects(res.projects);
      } catch (error) {
        console.error(error);
        toast.error("Error getting projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) =>
      searchQuery
        ? project.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.orgName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((project) => {
      if (activeTab === "published") return project.status !== "completed";
      return project.status === activeTab;
    })
    .sort((a, b) => {
      if (sortOption === "newest") return Number(b._id) - Number(a._id);
      if (sortOption === "oldest") return Number(a._id) - Number(b._id);
      if (sortOption === "az") return a.heading.localeCompare(b.heading);
      if (sortOption === "za") return b.heading.localeCompare(a.heading);
      return 0;
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Link
          href="/project/create"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          + Create Project
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {projectTab.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium capitalize ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationProjects;
