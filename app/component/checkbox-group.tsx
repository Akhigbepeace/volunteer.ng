// components/CheckboxGroup.tsx

import { FilterOption } from "@/types/filter";
import React from "react";

type CheckboxGroupProps = {
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (value: string, checked: boolean) => void;
  className?: string;
};

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    options,
    selectedValues,
    onSelectionChange,
    className = "grid md:grid-cols-3 gap-2",
  } = props;

  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={(e) => onSelectionChange(option.value, e.target.checked)}
            id={option.value}
            className="cursor-pointer"
          />
          <label htmlFor={option.value} className="cursor-pointer text-sm">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
