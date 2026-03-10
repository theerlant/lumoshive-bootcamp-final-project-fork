import { useState } from "react";

/**
 * Custom hook for sorting table columns.
 * Switch pattern: undefined -> 'asc' -> 'desc' -> undefined
 */
export const useSort = (
  defaultSortBy = undefined,
  defaultSortOrder = undefined,
) => {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const handleToggleSort = (by) => {
    if (sortBy === by) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder(undefined);
        setSortBy(undefined);
      }
    } else {
      setSortBy(by);
      setSortOrder("asc");
    }
  };

  return {
    sortBy,
    sortOrder,
    onSort: handleToggleSort,
    setSortBy,
    setSortOrder,
  };
};
