"use client";

import React, { useState } from "react";
import { Project } from "@/data/project";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { useRouter } from "next/navigation";

const defaultData: Project = {
  id: uuidv4(),
  image: "",
  type: "Project",
  duration: "",
  heading: "",
  orgName: "",
  description: "",
  category: "",
  status: "applied",
  location: "",
  startDate: "",
  endDate: "",
  requirements: [],
  benefits: [],
  contactEmail: "",
  contactPhone: "",
  maxVolunteers: 0,
  tags: [],
  createdAt: new Date().toISOString(),
};

const CreateProject = () => {
  const [formData, setFormData] = useState(defaultData);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultipleInputs = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "requirements" | "benefits" | "tags"
  ) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("New Project Created:", formData);
    router.push("/project/organization");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium">Project Title</label>
          <input
            required
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Enter project title"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium">
            Project Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a description for the project"
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        {/* Project Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            required
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Education, Health, etc."
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Project Duration */}
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            required
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 4 Weeks)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            required
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Location (optional)"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Start and End Date */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Start Date</label>
            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">End Date</label>
            <input
              required
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium">
            Requirements (comma separated)
          </label>
          <input
            required
            value={formData.requirements?.join(", ")}
            onChange={(e) => handleMultipleInputs(e, "requirements")}
            placeholder="Enter project requirements"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium">
            Benefits (comma separated)
          </label>
          <input
            required
            value={formData.benefits?.join(", ")}
            onChange={(e) => handleMultipleInputs(e, "benefits")}
            placeholder="Enter project benefits"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium">Contact Email</label>
          <input
            required
            type="email"
            name="contactEmail"
            value={formData.contactEmail || ""}
            onChange={handleChange}
            placeholder="Contact email"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium">Contact Phone</label>
          <input
            required
            type="tel"
            name="contactPhone"
            value={formData.contactPhone || ""}
            onChange={handleChange}
            placeholder="Contact phone number"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Max Volunteers */}
        <div>
          <label className="block text-sm font-medium">Max Volunteers</label>
          <input
            required
            type="number"
            name="maxVolunteers"
            value={formData.maxVolunteers || ""}
            min={1}
            onChange={handleChange}
            placeholder="Max volunteers for this project"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            required
            type="text"
            name="tags"
            value={formData.tags?.join(", ")}
            onChange={(e) => handleMultipleInputs(e, "tags")}
            placeholder="Enter tags"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Project Image */}
        <div>
          <label className="block text-sm font-medium">Project Image URL</label>
          <input
            required
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-secondary text-white rounded-lg"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
