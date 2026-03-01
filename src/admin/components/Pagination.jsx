import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

export const PaginationLimiterButton = ({
  limit,
  onLimitSet = (num) => {},
}) => {
  return (
    <div
      aria-label="Pagination limit selector"
      className="text-sm text-[#687182] font-admin font-medium"
    >
      <span>Row per page: </span>
      <select
        className="cursor-pointer font-semibold"
        onChange={(e) => {
          onLimitSet(Number(e.target.value));
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

const navigatorClasses =
  "flex items-center rounded-md py-0.5 px-1 border-2 border-[#464F6029] text-[#464F60] disabled:text-[#A1A9B8] disabled:bg-[#F7F9FC] cursor-pointer disabled:cursor-default";

export const PaginationNavigation = ({
  currentPage = 1,
  totalPages = 2,
  onPageChange = (num) => {},
}) => {
  return (
    <div className="flex gap-2">
      <button
        disabled={currentPage <= 1}
        className={navigatorClasses}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(currentPage - 1);
        }}
      >
        <LucideChevronLeft size={16} strokeWidth={3} />
      </button>
      <div className="font-admin text-sm font-medium">
        <span>{currentPage}</span>
        <span className="text-[#687182]">/{totalPages}</span>
      </div>
      <button
        disabled={currentPage >= totalPages}
        className={navigatorClasses}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(currentPage + 1);
        }}
      >
        <LucideChevronRight size={16} strokeWidth={3} />
      </button>
    </div>
  );
};

export const PaginationInfo = ({ currentPage = 1, limit = 20, total = 27 }) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  return (
    <span className="text-sm text-[#687182] font-medium">
      {start} - {end} of {total}
    </span>
  );
};
