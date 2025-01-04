"use client";

import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    calendarLink: "",
    category: "",
    numberOfVolunteers: 0,
  });

  const categories = ["Education", "Healthcare", "Environment", "Technology"];

  const router = useRouter();

  const handleChange = (e: SyntheticEvent) => {
    const { name, value, type, files } = e.currentTarget as HTMLInputElement;

    if (type === "file" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    router.push("/dashboard/project/org");
    // Add logic to send formData to your backend or API
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Project
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Project Image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Project Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Project Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            rows={4}
            required
          />
        </div>

        {/* Google Calendar Link */}
        <div className="mb-4">
          <label
            htmlFor="calendarLink"
            className="block text-sm font-medium text-gray-700"
          >
            Google Calendar Link (Appointment)
          </label>
          <input
            type="url"
            id="calendarLink"
            name="calendarLink"
            value={formData.calendarLink}
            onChange={handleChange}
            placeholder="https://calendar.google.com/..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        {/* Project Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Project Status */}
        <div className="mb-4">
          <label
            htmlFor="numberOfVolunteers"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            required
            min={1}
            type="number"
            id="numberOfVolunteers"
            name="numberOfVolunteers"
            value={formData.numberOfVolunteers}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
