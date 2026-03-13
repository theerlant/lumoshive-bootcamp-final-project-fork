import { useRef } from "react";
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

export const ExploreSection = () => {
  const scrollRef = useRef(null);
  const { data, isLoading } = useSWR("/products/random?limit=8", () =>
    productService.public.getRandom(8),
  );
  const products = data?.data || data || [];

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="flex flex-col gap-6 mt-14">
      <div className="flex justify-between items-center">
        <SectionHeader tag="Our Products" title="Explore Our Products" />
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 border border-black/20 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[270px] h-[320px] rounded-sm bg-gray-100 shrink-0 animate-pulse"
              />
            ))
          : products.map((product) => (
              <div key={product.id} className="shrink-0">
                <ProductCard
                  product={product}
                  onAddToCart={() => {
                    shoppingCartService
                      .addItem(product.id, 1)
                      .then(() => toast.success("Added to cart!"))
                      .catch(() => toast.error("Failed to add to cart"));
                  }}
                  onAddToWishlist={() => {
                    wishListService.public
                      .add(product.id)
                      .then(() => toast.success("Added to wishlist!"))
                      .catch(() => toast.error("Failed to update wishlist"));
                  }}
                  onRemoveFromWishlist={() => {
                    wishListService.public
                      .remove(product.id)
                      .then(() => toast.success("Removed from wishlist"))
                      .catch(() => toast.error("Failed to update wishlist"));
                  }}
                />
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/all">
          <Button className="px-14">View All Products</Button>
        </Link>
      </div>
    </div>
  );
};
