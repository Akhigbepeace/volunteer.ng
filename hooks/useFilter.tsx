import { getFilteredProject } from "@/lib/project";
import { FilterState, ProjectsApiParams } from "@/types/filter";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { toQueryString } from "./query-string";

const initialFilterState: FilterState = {
  cause: [],
  skills: [],
  type: [],
  location: [],
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback(
    (filterKey: keyof FilterState, values: string[]) => {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: values,
      }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (filterKey: keyof FilterState, value: string, checked: boolean) => {
      const currentValues = filters[filterKey];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      handleFilterChange(filterKey, newValues);
    },
    [filters, handleFilterChange]
  );

  const clearFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const searchProjects = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setIsLoading(true);

      try {
        const searchParams: Partial<ProjectsApiParams> = {
          ...filters,
          page,
          limit,
        };
        const queryString = toQueryString(searchParams);

        const results = await getFilteredProject(queryString);
        return results;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Search failed";
        toast.error(errorMessage);
        console.error("Search failed:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some((filterArray) => filterArray.length > 0);
  }, [filters]);

  return {
    filters,
    isLoading,
    handleFilterChange,
    handleCheckboxChange,
    clearFilters,
    searchProjects,
    hasActiveFilters,
  };
};
