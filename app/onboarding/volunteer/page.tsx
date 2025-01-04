"use client";

import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

type FormData = {
  fullName: string;
  phone: string;
  skills: string;
  industry: string;
  experience: string;
  sstpId: string;
};

const defaultData: FormData = {
  fullName: "",
  phone: "",
  skills: "",
  industry: "",
  experience: "",
  sstpId: "",
};

const skillOptions = [
  { value: "leadership", label: "Leadership" },
  { value: "communication", label: "Communication" },
  { value: "fundraising", label: "Fundraising" },
  { value: "eventPlanning", label: "Event Planning" },
  { value: "technicalSupport", label: "Technical Support" },
  { value: "graphicDesign", label: "Graphic Design" },
];

const industryOptions = [
  { value: "agriculture", label: "Agriculture" },
  { value: "automotive", label: "Automotive" },
  { value: "aerospace", label: "Aerospace" },
  { value: "bankingAndFinance", label: "Banking and Finance" },
  { value: "construction", label: "Construction" },
  { value: "consumerGoods", label: "Consumer Goods" },
  { value: "education", label: "Education" },
  { value: "energyAndUtilities", label: "Energy and Utilities" },
  { value: "entertainmentAndMedia", label: "Entertainment and Media" },
  { value: "fashionAndApparel", label: "Fashion and Apparel" },
  { value: "foodAndBeverage", label: "Food and Beverage" },
  { value: "government", label: "Government and Public Administration" },
  { value: "healthcare", label: "Healthcare and Pharmaceuticals" },
  { value: "hospitality", label: "Hospitality and Tourism" },
  { value: "informationTechnology", label: "Information Technology" },
  { value: "logistics", label: "Logistics and Transportation" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "marketing", label: "Marketing and Advertising" },
  { value: "nonprofit", label: "Nonprofit and Volunteering" },
  { value: "professionalServices", label: "Professional Services" },
  { value: "realEstate", label: "Real Estate" },
  { value: "retail", label: "Retail and E-commerce" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "wasteManagement", label: "Waste Management and Recycling" },
  { value: "wholesaleTrade", label: "Wholesale Trade" },
];

const VolunteerOnboardingForm = () => {
  const [formData, setFormData] = useState<FormData>(defaultData);

  const router = useRouter();

  const handleInputChange = (e: SyntheticEvent) => {
    const { name, value } = e.currentTarget as HTMLFormElement;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData) router.push("/project/volunteer");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-10"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
          Volunteer Onboarding
        </h1>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 mb-1">
            Full Name
          </label>
          <input
            required
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            required
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 mb-1">
            Skill Set
          </label>

          <select
            required
            name="skills"
            id="skills"
            value={formData.skills}
            onChange={handleInputChange}
          >
            <option
              defaultChecked
              disabled
              className="focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Select Skills
            </option>
            {skillOptions.map((skill, index) => (
              <option key={index} value={skill.value}>
                {skill.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="industries" className="block text-gray-700 mb-1">
            Industry
          </label>

          <select
            required
            name="industry"
            id="industry"
            value={formData.industry}
            onChange={handleInputChange}
          >
            <option
              defaultChecked
              disabled
              className="focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Select Industry
            </option>
            {industryOptions.map((skill, index) => (
              <option key={index} value={skill.value}>
                {skill.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 mb-1">
            Experience (Years)
          </label>
          <input
            required
            min="1"
            type="number"
            id="experience"
            name="experience"
            placeholder="Enter Years of Experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sstpId" className="block text-gray-700 mb-1">
            SSTP/SSAF ID
          </label>
          <input
            required
            type="text"
            id="sstpId"
            name="sstpId"
            placeholder="Enter SSTP/SSAF ID"
            value={formData.sstpId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

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

export default VolunteerOnboardingForm;
