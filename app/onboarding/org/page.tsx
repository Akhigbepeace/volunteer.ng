"use client";

import Loader from "@/app/component/loader";
import { handleOrganizationOnboarding } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

type Industry = {
  value: string;
  label: string;
};

export type OrganizationOnboardingForm = {
  displayName: string;
  email: string;
  phoneNumber: string;
  address: string;
  description: string;
  websiteURL: string;
  organizationType: string;
  industry: string[];
};

const industryOptions: Industry[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "informationTechnology", label: "Information Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail and E-commerce" },
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
  industry: [],
  description: "",
  organizationType: "",
  websiteURL: "",
};

const OrgOnboardingForm = () => {
  const [loading, setLoading] = useState(false);
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

  const handleIndustryChange = (value: string) => {
    setFormData((prevData) => {
      const isSelected = prevData.industry.includes(value);
      const updatedIndustries = isSelected
        ? prevData.industry.filter((v) => v !== value)
        : [...prevData.industry, value];

      return { ...prevData, industry: updatedIndustries };
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await handleOrganizationOnboarding({
        userId,
        organization: formData,
      });

      if (res.status === "true") {
        toast.success("Onboarded Successfully");

        setTimeout(() => {
          router.push("/project/organization");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Onboard organization");
    } finally {
      setLoading(false);
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

        {/* Industry with checkboxes */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Select Industry</label>
          <div className="border rounded-lg px-4 py-2 space-y-2 max-h-40 overflow-y-auto">
            {industryOptions.map((industry) => (
              <label
                key={industry.value}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={formData.industry.includes(industry.value)}
                  onChange={() => handleIndustryChange(industry.value)}
                />
                <span>{industry.label}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You can select multiple industries.
          </p>
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
            value={formData.organizationType}
            onChange={handleSelectChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>
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

        {/* Submit */}

        <button
          type="submit"
          className="w-full py-3 bg-secondary text-white rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Loader /> : null}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OrgOnboardingForm;
