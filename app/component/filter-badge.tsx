import React from "react";

type FilterBadgeProps = {
  count: number;
  className?: string;
};

const FilterBadge = (props: FilterBadgeProps) => {
  const {
    count,
    className = "ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full",
  } = props;

  if (count === 0) return null;

  return <span className={className}>{count}</span>;
};

export default FilterBadge;
