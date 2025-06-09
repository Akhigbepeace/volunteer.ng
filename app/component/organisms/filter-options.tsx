"use client";
import {
  locationOptions,
  sdgOptions,
  skillsOptions,
} from "@/data/filter-options";
import { Project } from "@/data/project";
import { useFilters } from "@/hooks/useFilter";
import { FilterSection } from "@/types/filter";
import React, { useState, useEffect } from "react";
import TypeFilterComponent from "../type-filter";
import FilterDropdown from "../filter-dropdown";
import FilterActions from "../filter-actions";
import { ToastContainer } from "react-toastify";

type FilterOptionsProps = {
  onSearchError?: (error: string) => void;
  className?: string;
  setProjects: (project: Project[]) => void;
};

const FilterOptions = (props: FilterOptionsProps) => {
  const { onSearchError, setProjects, className = "" } = props;

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const {
    filters,
    isLoading,
    handleFilterChange,
    handleCheckboxChange,
    clearFilters,
    searchProjects,
  } = useFilters();

  const filterSections: FilterSection[] = [
    {
      title: "SDG Causes",
      key: "cause",
      options: sdgOptions,
    },
    {
      title: "Skills",
      key: "skills",
      options: skillsOptions,
    },
    {
      title: "Type",
      key: "type",
      customComponent: TypeFilterComponent,
    },
    {
      title: "Location",
      key: "location",
      options: locationOptions,
    },
  ];

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClear = () => {
    clearFilters();
    setOpenMenuIndex(null);
  };

  const handleSearch = async () => {
    try {
      const results = await searchProjects(1, 10);
      setProjects(results.projects);
      setOpenMenuIndex(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Search failed";
      onSearchError?.(errorMessage);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".filter-container")) {
        setOpenMenuIndex(null);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuIndex]);

  return (
    <div
      className={`bg-white md:flex items-center justify-center border border-secondary relative filter-container ${className}`}
    >
      <ToastContainer />

      <FilterDropdown
        sections={filterSections}
        filters={filters}
        openMenuIndex={openMenuIndex}
        onToggleMenu={toggleMenuOption}
        onFilterChange={handleFilterChange}
        onCheckboxChange={handleCheckboxChange}
      />

      <FilterActions
        onClear={handleClear}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FilterOptions;
