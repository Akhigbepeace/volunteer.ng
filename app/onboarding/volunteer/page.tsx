"use client";

import Loader from "@/app/component/loader";
import MultiSelectDropdown from "@/app/component/multiple-select-dropdown";
import { handleVolunteerOnboarding } from "@/lib/user";
// import { handleVolunteerOnboarding } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

export type VolunteerOnboardingData = {
  displayName: string;
  phone: string;
  skills: string[];
  user: string;
  industry: string[];
  experience: string;
  school: string;
  company: string;
  sosecGraduate: string;
  sosecProgram: string;
};

const defaultData: VolunteerOnboardingData = {
  displayName: "",
  phone: "",
  skills: [],
  industry: [],
  school: "",
  company: "",
  experience: "",
  user: "",
  sosecGraduate: "",
  sosecProgram: "",
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
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] =
    useState<VolunteerOnboardingData>(defaultData);

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

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(value)
        ? prev.skills.filter((skill) => skill !== value)
        : [...prev.skills, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await handleVolunteerOnboarding({
        userId,
        volunteer: formData,
      });

      if (res) router.push("/project/volunteer");
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />

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
            id="displayName"
            name="displayName"
            placeholder="Enter Full Name"
            value={formData.displayName}
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
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <MultiSelectDropdown
          skillOptions={skillOptions}
          formData={formData}
          handleCheckboxChange={handleCheckboxChange}
        />

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
          <label htmlFor="sosecGraduate" className="block text-gray-700 mb-1">
            Are you a graduate of SoSec College?
          </label>
          <select
            id="sosecGraduate"
            name="sosecGraduate"
            value={formData.sosecGraduate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.sosecGraduate === "Yes" && (
          <div className="mb-4">
            <label htmlFor="sosecProgram" className="block text-gray-700 mb-1">
              Select your SoSec program
            </label>
            <select
              id="sosecProgram"
              name="sosecProgram"
              value={formData.sosecProgram}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="" disabled>
                Select your program
              </option>
              <option value="SSTP">SSTP</option>
              <option value="SSEP/SSAF">SSEP / SSAF</option>
            </select>
          </div>
        )}

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Are you a student or professional worker?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                Student
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="professional"
                  checked={userType === "professional"}
                  onChange={handleUserTypeChange}
                  className="mr-2"
                />
                Professional Worker
              </label>
            </div>
          </div>

          {userType === "student" && (
            <div className="mb-4">
              <label htmlFor="school" className="block text-gray-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {userType === "professional" && (
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          {loading ? <Loader /> : null}
          {loading ? "Please Wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VolunteerOnboardingForm;
