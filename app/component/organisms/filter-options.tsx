"use client";
import {
  locationOptions,
  sdgOptions,
  skillsOptions,
  typeOptions,
} from "@/data/filter-options";
import { Project } from "@/data/project";
import { useFilters } from "@/hooks/useFilter";
import { FilterSection } from "@/types/filter";
import React, { useState, useEffect } from "react";
import FilterDropdown from "../filter-dropdown";
import FilterActions from "../filter-actions";
import { ToastContainer } from "react-toastify";

type FilterOptionsProps = {
  onSearchError?: (error: string) => void;
  className?: string;
  setLoading: (value: boolean) => void;
  setProjects: (project: Project[]) => void;
};

const FilterOptions = (props: FilterOptionsProps) => {
  const { onSearchError, setProjects, className = "", setLoading } = props;

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [shouldSearchOnClose, setShouldSearchOnClose] = useState(false);

  const {
    filters,
    isLoading,
    handleFilterChange,
    handleCheckboxChange,
    clearFilters,
    searchProjects,
  } = useFilters();

  const filterSections: FilterSection[] = [
    { title: "SDG Causes", key: "cause", options: sdgOptions },
    { title: "Skills", key: "skills", options: skillsOptions },
    { title: "Type", key: "type", options: typeOptions },
    { title: "Location", key: "location", options: locationOptions },
  ];

  const toggleMenuOption = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClear = async () => {
    clearFilters();
    setOpenMenuIndex(null);

    setLoading(true);
    try {
      const results = await searchProjects(1, 10);
      setProjects(results.projects);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load projects";
      onSearchError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchProjects(1, 10);
      setProjects(results.projects);
      setOpenMenuIndex(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Search failed";
      onSearchError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enhanced filter change handlers
  const handleFilterChangeWithTrigger = (
    ...args: Parameters<typeof handleFilterChange>
  ) => {
    setShouldSearchOnClose(true);
    handleFilterChange(...args);
  };

  const handleCheckboxChangeWithTrigger = (
    ...args: Parameters<typeof handleCheckboxChange>
  ) => {
    setShouldSearchOnClose(true);
    handleCheckboxChange(...args);
  };

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".filter-container")) {
        setOpenMenuIndex(null);

        if (shouldSearchOnClose) {
          setLoading(true);
          try {
            const results = await searchProjects(1, 10);
            setProjects(results.projects);
          } catch (err) {
            const errorMessage =
              err instanceof Error ? err.message : "Search failed";
            onSearchError?.(errorMessage);
          } finally {
            setLoading(false);
            setShouldSearchOnClose(false);
          }
        }
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [
    openMenuIndex,
    shouldSearchOnClose,
    searchProjects,
    setProjects,
    onSearchError,
  ]);

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
        onFilterChange={handleFilterChangeWithTrigger}
        onCheckboxChange={handleCheckboxChangeWithTrigger}
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
