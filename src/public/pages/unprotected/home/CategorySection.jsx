import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { categoryService } from "../../../../shared/services/categoryService";
import { SectionHeader } from "./SectionHeader";

const ITEMS_PER_PAGE = 6;

const CategoryCard = ({ category }) => (
  <Link
    to={`/category/${category.value}`}
    className="flex flex-col items-center justify-center gap-3 border border-black/15 rounded-sm aspect-square p-4 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors group cursor-pointer flex-1"
  >
    {category.icon ? (
      <img
        src={`${category.icon}`}
        alt={category.label}
        className="w-10 h-10 object-contain group-hover:invert"
      />
    ) : (
      <div className="w-10 h-10 bg-gray-200 rounded-full group-hover:bg-white/20" />
    )}
    <span className="text-xs font-medium text-center whitespace-nowrap">
      {category.label}
    </span>
  </Link>
);

export const CategorySection = () => {
  const [page, setPage] = useState(0);

  const { data } = useSWR(
    "/categories/select",
    categoryService.public.getForDropdown,
  );
  const categories = Array.isArray(data) ? data : [];

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const visible = categories.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex flex-col gap-6 mt-14">
      <div className="flex justify-between items-center">
        <SectionHeader tag="Categories" title="Browse By Category" />
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={page === 0}
            className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            onClick={next}
            disabled={page >= totalPages - 1}
            className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {visible.length > 0
          ? visible.map((cat) => (
              <CategoryCard key={cat.value} category={cat} />
            ))
          : Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="flex-1 aspect-square rounded-sm bg-gray-100 animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};
