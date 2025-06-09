// components/TypeFilterComponent.tsx

import { typeCategories } from "@/data/filter-options";
import { FilterComponentProps } from "@/types/filter";
import React from "react";

const TypeFilterComponent = (props: FilterComponentProps) => {
  const { selectedValues, onSelectionChange } = props;

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, value]);
    } else {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    }
  };

  return (
    <div className="space-y-6 flex gap-32">
      {typeCategories.map((category, index) => (
        <div
          key={index}
          className="flex items-start gap-3 m-0"
        >
          {!category.options && category.value && (
            <input
              type="checkbox"
              className="mt-2 sm:mt-0 cursor-pointer"
              checked={selectedValues.includes(category.value)}
              onChange={(e) =>
                handleCheckboxChange(category.value!, e.target.checked)
              }
              id={category.heading.toLowerCase().replace(/\s+/g, "-")}
            />
          )}

          <div className="sm:w-full">
            <h1 className="font-bold text-xl sm:text-lg">{category.heading}</h1>
            <div className="grid gap-3 sm:text-sm">
              {category.options ? (
                category.options.map((option, optionIndex) => (
                  <span key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) =>
                        handleCheckboxChange(option.value, e.target.checked)
                      }
                      id={option.value}
                      className="cursor-pointer"
                    />
                    <label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </label>
                  </span>
                ))
              ) : (
                <p className="text-gray-600">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypeFilterComponent;
