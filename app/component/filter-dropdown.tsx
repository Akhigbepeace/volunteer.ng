import { FilterSection, FilterState } from "@/types/filter";
import React, { Fragment } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterBadge from "./filter-badge";
import CheckboxGroup from "./checkbox-group";

type FilterDropdownProps = {
  sections: FilterSection[];
  filters: FilterState;
  openMenuIndex: number | null;
  onToggleMenu: (index: number) => void;
  onFilterChange: (filterKey: keyof FilterState, values: string[]) => void;
  onCheckboxChange: (
    filterKey: keyof FilterState,
    value: string,
    checked: boolean
  ) => void;
};

const FilterDropdown = (props: FilterDropdownProps) => {
  const {
    sections,
    filters,
    openMenuIndex,
    onToggleMenu,
    onFilterChange,
    onCheckboxChange,
  } = props;

  return (
    <div className="md:flex items-center justify-center border-y md:border-x divide-secondary border-secondary md:divide-x">
      {sections.map((section, index) => {
        const isSelectedMenu = openMenuIndex === index;
        const filterCount = filters[section.key].length;

        return (
          <Fragment key={index}>
            <div
              onClick={() => onToggleMenu(index)}
              className={`flex items-center justify-between gap-20 py-3 px-5 cursor-pointer hover:bg-gray-50 transition-colors ${
                isSelectedMenu ? "border-b-2 border-secondary bg-gray-50" : ""
              }`}
            >
              <span className="flex items-center">
                {section.title}
                <FilterBadge count={filterCount} />
              </span>
              {isSelectedMenu ? (
                <FaChevronUp color="#1F2421" size={13} />
              ) : (
                <FaChevronDown color="#1F2421" size={13} />
              )}
            </div>

            {isSelectedMenu && (
              <div className="bg-white shadow-xl lg:py-10 lg:px-40 p-5 w-full absolute right-0 top-[52px] z-10 max-h-96 overflow-y-auto">
                {section.customComponent ? (
                  <div className="w-full">
                    <section.customComponent
                      selectedValues={filters[section.key]}
                      onSelectionChange={(values) =>
                        onFilterChange(section.key, values)
                      }
                    />
                  </div>
                ) : (
                  section.options && (
                    <CheckboxGroup
                      options={section.options}
                      selectedValues={filters[section.key]}
                      onSelectionChange={(value, checked) =>
                        onCheckboxChange(section.key, value, checked)
                      }
                    />
                  )
                )}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default FilterDropdown;
