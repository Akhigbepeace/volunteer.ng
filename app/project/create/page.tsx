"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Project } from "@/data/project";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import {
  CloudinaryRes,
  createProject,
  uploadImageToCloudinary,
} from "@/lib/project";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

const defaultData: Project = {
  _id: uuidv4(),
  image: "",
  type: "Project",
  duration: "",
  heading: "",
  orgName: "",
  description: "",
  category: "",
  deadline: "",
  numberOfHours: 0,
  status: "applied",
  location: null,
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
  const [loading, setLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    if (user?.id) {
      setUserId(user.id);
    } else {
      toast.error("User not logged in.");
      router.push("/login");
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const res = await createProject({
        userId,
        project: {
          ...formData,
        },
      });

      if (res.project) {
        setFormData(defaultData);
        toast.success("Project Created Successfully");
        setTimeout(() => {
          router.push("/project/organization");
        }, 3000);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageIsLoading(true);

      const imageRes: CloudinaryRes = await uploadImageToCloudinary(file);

      const { secure_url, public_id } = imageRes;

      setFormData((prev) => ({ ...prev, public_id, image: secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImageIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ToastContainer />

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

        {/* Hours by week */}
        <div>
          <label id="numberOfHours" className="block text-sm font-medium">
            Hours per Week
          </label>
          <input
            required
            type="number"
            name="numberOfHours"
            value={formData.numberOfHours}
            min={1}
            onChange={handleChange}
            placeholder="Enter the number of hours per week"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="location"
                value="remote"
                checked={formData.location === "remote"}
                onChange={handleChange}
                required
              />
              Remote
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="location"
                value="physical"
                checked={formData.location === "physical"}
                onChange={handleChange}
              />
              Physical
            </label>
          </div>
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

        {/* Application Deadline */}
        <div>
          <label id="deadline" className="block text-sm font-medium">
            Application Deadline
          </label>
          <input
            required
            type="date"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
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
          <label id="image" className="block text-sm font-medium">
            Project Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            className="w-full p-2 border rounded"
          />
          {imageIsLoading && <div>Loading Image....</div>}
          {!imageIsLoading && formData.image && (
            <div className="relative w-full h-[300px]">
              <Image
                src={formData.image}
                fill
                alt="Preview"
                className="mt-2 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-secondary text-white rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : null}
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
