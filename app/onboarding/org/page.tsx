"use client";

import { handleOrganizationOnboarding } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

export type OrganizationOnboardingForm = {
  displayName: string;
  email: string;
  phoneNumber: string;
  address: string;
  description: string;
  websiteURL: string;
  organizationType: string;
  industry: string;
};

const industryOptions = [
  { value: "agriculture", label: "Agriculture" },
  { value: "informationTechnology", label: "Information Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail and E-commerce" },
  // Add more industries as needed
];

const organizationType = [
  { value: "ngo", label: "Non-Governmental Organization" },
  { value: "corporate", label: "Corporate" },
  { value: "startup", label: "Startup" },
  { value: "government", label: "Government" },
];

const defaultData: OrganizationOnboardingForm = {
  displayName: "",
  email: "",
  phoneNumber: "",
  address: "",
  industry: industryOptions[0].value,
  description: "",
  organizationType: organizationType[0].value,
  websiteURL: "",
};

const OrgOnboardingForm = () => {
  const [formData, setFormData] =
    useState<OrganizationOnboardingForm>(defaultData);

  const router = useRouter();
  const cookies = new Cookies();
  const user = cookies.get("user");
  const userId = user?.id;

  const handleInputChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLFormElement;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLSelectElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await handleOrganizationOnboarding({
        userId,
        organization: formData,
      });

      if (res.organisation) {
        toast.success("Onboarded Successful");

        setTimeout(() => {
          router.push("/project/org");
        }, 3000);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Organization Onboarding
        </h1>

        {/* Organization Name */}
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-gray-700 mb-1">
            Organization Name
          </label>

          <input
            required
            type="text"
            id="displayName"
            name="displayName"
            placeholder="Enter Organization Name"
            value={formData.displayName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Contact Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter Contact Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Contact Phone */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            required
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Contact Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 mb-1">
            Address
          </label>
          <input
            required
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label htmlFor="industry" className="block text-gray-700 mb-1">
            Industry
          </label>

          <select
            name="industry"
            id="industry"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => handleSelectChange(e)}
          >
            <option defaultChecked disabled>
              Select Industry
            </option>
            {industryOptions.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            id="description"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Organization Type */}

        <div className="mb-4">
          <label
            htmlFor="organizationType"
            className="block text-gray-700 mb-1"
          >
            Organization Type
          </label>

          <select
            required
            name="organizationType"
            id="organizationType"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => handleSelectChange(e)}
          >
            <option defaultChecked disabled>
              Select Organization Type
            </option>
            {organizationType.map((organization) => (
              <option key={organization.value} value={organization.value}>
                {organization.label}
              </option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div className="mb-4">
          <label htmlFor="websiteURL" className="block text-gray-700 mb-1">
            Website URL or Social Media Link
          </label>
          <input
            required
            type="url"
            id="websiteURL"
            name="websiteURL"
            placeholder="Enter Website URL"
            value={formData.websiteURL}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrgOnboardingForm;
