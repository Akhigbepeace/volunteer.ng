import React from "react";

type FilterActionsProps = {
  onClear: () => void;
  onSearch: () => void;
  isLoading: boolean;
};

const FilterActions = (props: FilterActionsProps) => {
  const { onClear, onSearch, isLoading } = props;

  return (
    <>
      <div className="flex items-center justify-center py-3 px-5 w-40 border-r border-secondary">
        <button
          onClick={onClear}
          className="hover:text-red-600 transition-colors font-medium text-sm"
          disabled={isLoading}
        >
          Clear
        </button>
      </div>

      <div className="flex items-center justify-center py-3 px-5 border-r w-40 border-secondary">
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="hover:text-primary transition-colors disabled:opacity-50 font-medium text-sm"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </>
  );
};

export default FilterActions;
