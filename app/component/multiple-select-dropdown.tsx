import { useState } from "react";

type SkillOption = {
  value: string;
  label: string;
};

type FormData = {
  skills: string[];
};

type MultiSelectDropdownProps = {
  skillOptions: SkillOption[];
  formData: FormData;
  handleCheckboxChange: (value: string) => void;
};

const MultiSelectDropdown = (props: MultiSelectDropdownProps) => {
  const { skillOptions, formData, handleCheckboxChange } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <label htmlFor="skills" className="block text-gray-700 mb-1">
        Skill Set
      </label>

      <div
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formData.skills.length > 0
          ? formData.skills
              .map(
                (skill) => skillOptions.find((s) => s.value === skill)?.label
              )
              .join(", ")
          : "Select Skills"}
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {skillOptions.map((skill) => (
            <label
              key={skill.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.skills.includes(skill.value)}
                onChange={() => handleCheckboxChange(skill.value)}
                className="mr-2"
              />
              {skill.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
