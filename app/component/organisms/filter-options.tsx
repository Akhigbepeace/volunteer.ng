"use client";
import React, { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const optionSelectors = [
  {
    title: "Causes",
    options: [
      "Animals",
      "Arts & culture",
      "Civil rights",
      "Community & economic development",
      "Disaster relief",
      "Disease & medical research",
      "Diversity & inclusion",
      "Education",
      "Employment services",
      "Environment",
      "Gender equity & justice",
      "Health & nutrition",
      "Housing & homelessness",
      "Human services",
      "International affairs",
      "Justice & legal services",
      "LGBTQ+",
      "Maternal health",
      "Military & veterans affairs",
      "Philanthropy & capacity building",
      "Religion & spirituality",
      "Science & technology",
      "Violence prevention",
      "Youth development",
    ],
  },
  {
    title: "Skills",
    options: [
      "Accounting",
      "Artificial intelligence",
      "Branding",
      "Business development",
      "Coaching",
      "Communications",
      "Data analysis",
      "Database administration",
      "Digital advertising",
      "Digital marketing",
      "Engineering",
      "Entrepreneurship",
      "Event planning",
      "Executive leadership",
      "Finance",
      "Fundraising",
      "Graphic design",
      "Human resources",
      "Information technology",
      "Management",
      "Marketing",
      "Organizational design",
      "Photography & video",
      "Project management",
      "Public relations",
      "Research",
      "Sales",
      "Search engine marketing",
      "Social media",
      "Sound editing",
      "Strategy consulting",
      "Talent recruitment",
      "Training",
      "Web design",
      "Web development",
      "Writing",
    ],
  },
  {
    title: "Type",
  },
  {
    title: "Location",
    options: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "Federal Capital Territory (FCT)",
    ],
  },
];

const types = [
  {
    heading: "Mode",
    desc: ["Virtual", "Hybrid", "Physical"],
  },
  {
    heading: "Professional Advise",
    desc: "Answer questions or give advice in written format.",
  },
  {
    heading: "Full-length projects",
    desc: "Pre-scoped projects ranging from brand messaging to marketing campaigns, and more that can take 1-6 weeks.",
  },
];

const MenuType = () => {
  return (
    <div className="space-y-6">
      {types.map((type, index) => (
        <div
          key={index}
          className="flex items-start gap-4 flex-wrap sm:flex-col"
        >
          {/* Checkbox for Single Description */}
          {!Array.isArray(type.desc) && (
            <input
              type="checkbox"
              className="mt-2 sm:mt-0"
              name={type.heading.toLowerCase()}
              id={type.heading.toLowerCase()}
            />
          )}

          {/* Text Content */}
          <div className="sm:w-full">
            <h1 className="font-bold text-xl sm:text-lg">{type.heading}</h1>
            <div className="grid gap-3 sm:text-sm">
              {Array.isArray(type.desc) ? (
                type.desc.map((mode, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={mode.toLowerCase()}
                      id={mode.toLowerCase()}
                    />
                    {mode}
                  </span>
                ))
              ) : (
                <p>{type.desc}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FilterOptions = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-white md:flex items-center justify-center border border-secondary relative">
      <div className="md:flex items-center justify-center border-y md:border-x divide-secondary border-secondary md:divide-x">
        {optionSelectors.map((selector, index) => {
          const isSelectedMenu = openMenuIndex === index;
          return (
            <Fragment key={index}>
              <div
                key={index}
                onClick={() => toggleMenuOption(index)}
                className={`flex items-center justify-between gap-20 py-3 px-5 cursor-pointer ${
                  isSelectedMenu ? "border-b-2 border-secondary" : ""
                }`}
              >
                <span>{selector.title}</span>
                {isSelectedMenu ? (
                  <FaChevronUp color="#1F2421" size={13} />
                ) : (
                  <FaChevronDown color="#1F2421" size={13} />
                )}
              </div>

              {isSelectedMenu && (
                <div className="bg-white shadow-xl lg:py-10 lg:px-40 p-5 grid md:grid-cols-3 w-full absolute right-0 top-[52px] z-10">
                  {index === 2 && <MenuType />}
                  {selector.options?.map((option, index) => {
                    return (
                      <div key={index} className="flex items-center gap-5">
                        <input
                          type="checkbox"
                          name={option.toLowerCase()}
                          id={option.toLowerCase()}
                        />
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="flex items-center gap-20 py-3 px-5 w-40 border-r border-secondary">
        <button className="">Clear</button>
      </div>
      <div className="flex items-center gap-20 py-3 px-5 border-r w-40 border-secondary">
        Search
      </div>
    </div>
  );
};

export default FilterOptions;
