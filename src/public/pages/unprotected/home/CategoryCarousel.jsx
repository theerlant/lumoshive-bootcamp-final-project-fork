import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { categoryService } from "../../../../shared/services/categoryService";
import { productService } from "../../../../shared/services/productService";

// Fetches first product image for a given categoryId
const useCategoryProductImage = (categoryId) => {
  const { data } = useSWR(
    categoryId ? `/products?category_id=${categoryId}&limit=1` : null,
    () => productService.public.getAll({ categoryId, limit: 1 }),
  );
  const products = Array.isArray(data) ? data : data?.data || [];
  const img = products[0]?.images?.[0]?.image_url;
  return img ? `${img}` : null;
};

// Per-category metadata: jargon headline + placeholder product image
const CATEGORY_META = {
  wearables: {
    title: "Wear the Future\nToday",
  },
  audio: {
    title: "Enhance Your\nMusic Experience",
  },
  gaming: {
    title: "Play Beyond\nAll Limits",
  },
  cameras: {
    title: "Capture Every\nPerfect Moment",
  },
  electronics: {
    title: "Power Your\nWorld Forward",
  },
  smartphones: {
    title: "Stay Connected\nAnywhere",
  },
};

const CategorySlideImage = ({ categoryId, categoryLabel }) => {
  const productImage = useCategoryProductImage(categoryId);
  if (!productImage) return null;
  return (
    <img
      src={productImage}
      alt={categoryLabel}
      className="absolute h-[90%] right-10 object-contain z-10 pointer-events-none"
    />
  );
};

export const CategoryCarousel = () => {
  const [current, setCurrent] = useState(0);

  const { data } = useSWR(
    "/categories/select",
    categoryService.public.getForDropdown,
  );
  const categories = Array.isArray(data) ? data : data?.data || [];

  const total = categories.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % Math.max(1, total));
  }, [total]);

  const prev = () =>
    setCurrent((c) => (c - 1 + Math.max(1, total)) % Math.max(1, total));

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, total]);

  const category = categories[current];
  const meta =
    CATEGORY_META[category?.label?.toLowerCase()] ??
    Object.values(CATEGORY_META)[current % 6];

  return (
    <div className="relative w-full rounded-sm overflow-hidden bg-black flex items-center p-16 min-h-[400px] transition-colors duration-700">
      {/* Left content */}
      <div className="flex flex-col justify-between gap-6 max-w-md h-full z-10 text-white">
        <p
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: meta?.accentColor }}
        >
          {category?.label ?? "Categories"}
        </p>
        <h2 className="text-5xl font-semibold leading-tight">
          {meta?.title ?? "Discover"}
        </h2>
        <Link
          to={`/shop?category=${category?.value ?? ""}`}
          className="inline-flex items-center justify-center font-semibold px-8 py-3 rounded-sm w-max transition-opacity hover:opacity-85"
          style={{ backgroundColor: meta?.accentColor, color: "#000" }}
        >
          Buy Now!
        </Link>
      </div>

      {/* Product Image — fetched from first product in this category */}
      <CategorySlideImage
        categoryId={category?.value}
        categoryLabel={category?.label}
      />

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-20"
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-20"
      >
        <ChevronRightIcon size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {categories.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current
                ? "w-2.5 h-2.5 bg-[#DB4444] outline-2 outline-white -outline-offset-2"
                : "w-2.5 h-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
