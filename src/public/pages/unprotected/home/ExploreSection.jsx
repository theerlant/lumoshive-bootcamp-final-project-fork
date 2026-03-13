import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { productService } from "../../../../shared/services/productService";
import shoppingCartService from "../../../../shared/services/shoppingCartService";
import { wishListService } from "../../../../shared/services/wishListService";
import { ProductCard } from "../../../components/ProductCard";
import { SectionHeader } from "./SectionHeader";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
const MAX_PAGES = 3;
const TOTAL_FETCH = ITEMS_PER_PAGE * MAX_PAGES; // 12

export const ExploreSection = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useSWR(
    `/products/random?limit=${TOTAL_FETCH}`,
    () => productService.public.getRandom(TOTAL_FETCH),
  );
  const allProducts = Array.isArray(data) ? data : data?.data || [];

  const totalPages = Math.min(
    MAX_PAGES,
    Math.ceil(allProducts.length / ITEMS_PER_PAGE),
  );
  const visible = allProducts.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const makeHandlers = (product) => ({
    onAddToCart: () =>
      shoppingCartService
        .addItem(product.id, 1)
        .then(() => toast.success("Added to cart!"))
        .catch(() => toast.error("Failed to add to cart")),
    onAddToWishlist: () =>
      wishListService.public
        .add(product.id)
        .then(() => toast.success("Added to wishlist!"))
        .catch(() => toast.error("Failed to update wishlist")),
    onRemoveFromWishlist: () =>
      wishListService.public
        .remove(product.id)
        .then(() => toast.success("Removed from wishlist"))
        .catch(() => toast.error("Failed to update wishlist")),
  });

  return (
    <div className="flex flex-col gap-6 mt-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <SectionHeader tag="Our Products" title="Explore Our Products" />
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

      {/* Grid */}
      <div className="grid grid-cols-4 gap-6 gap-y-12">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[320px] rounded-sm bg-gray-100 animate-pulse"
              />
            ))
          : visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                {...makeHandlers(product)}
              />
            ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/all">
          <Button className="px-14">View All Products</Button>
        </Link>
      </div>
    </div>
  );
};
