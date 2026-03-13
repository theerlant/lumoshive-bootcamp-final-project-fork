import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { categoryService } from "../../../../shared/services/categoryService";
import { SectionHeader } from "./SectionHeader";

const CategoryCard = ({ category }) => (
  <Link
    to={`/shop?category=${category.value}`}
    className="flex flex-col items-center justify-center gap-3 border border-black/15 rounded-sm p-6 min-w-[120px] hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors group cursor-pointer"
  >
    {category.icon ? (
      <img
        src={`http://103.150.116.241:8082${category.icon}`}
        alt={category.label}
        className="w-12 h-12 object-contain group-hover:invert"
      />
    ) : (
      <div className="w-12 h-12 bg-gray-200 rounded-full group-hover:bg-white/20" />
    )}
    <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
  </Link>
);

export const CategorySection = () => {
  const scrollRef = useRef(null);

  const { data } = useSWR("/categories/select", categoryService.public.getForDropdown);
  const categories = Array.isArray(data) ? data : data?.data || [];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 240, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-14">
      <div className="flex justify-between items-center">
        <SectionHeader tag="Categories" title="Browse By Category" />
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors">
            <ChevronLeftIcon size={18} />
          </button>
          <button onClick={() => scroll(1)} className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors">
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.length > 0
          ? categories.map((cat) => <CategoryCard key={cat.value} category={cat} />)
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[120px] h-[120px] rounded-sm bg-gray-100 animate-pulse" />
            ))}
      </div>
    </div>
  );
};
