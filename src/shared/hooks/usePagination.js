import { useState } from "react";

export const usePagination = (defaultPage = 1, defaultLimit = 10) => {
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitSet = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  return {
    page,
    limit,
    setPage: handlePageChange,
    setLimit: handleLimitSet,
  };
};
