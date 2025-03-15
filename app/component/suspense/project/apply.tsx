"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ProjectApplication = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const project = searchParams.get("project");

  // Mock authenticated user (replace with actual auth state)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "",
    project: project || "",
    qualifications: "",
    experience: "",
    skills: "",
    availability: "",
    message: "",
  });

  useEffect(() => {
    if (project) {
      setFormData((prev) => ({ ...prev, project }));
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/project/volunteer");
    toast.success("Application submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Volunteer Application
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          disabled
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <input
          type="text"
          name="project"
          value={formData.project}
          disabled
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Your Highest Qualification
          </option>
          <option value="High School Diploma">High School Diploma</option>
          <option value="Associate Degree">Associate Degree</option>
          <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
          <option value="Master's Degree">Master&apos;s Degree</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Years of Experience
          </option>
          <option value="Less than 1 year">Less than 1 year</option>
          <option value="1-3 years">1-3 years</option>
          <option value="4-6 years">4-6 years</option>
          <option value="7+ years">7+ years</option>
        </select>

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Relevant Skills (e.g., Teaching, First Aid, Public Speaking)"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Availability
          </option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Flexible">Flexible</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Why do you want to volunteer?"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-secondary text-white p-2 rounded"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default ProjectApplication;
