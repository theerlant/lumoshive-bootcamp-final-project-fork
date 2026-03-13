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
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";

const ProductRow = ({ products = [], isLoading, scrollRef, onScroll }) => (
  <div className="flex flex-col gap-6 mt-14">
    <div
      ref={scrollRef}
      className="flex justify-between pb-2"
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
  </div>
);

export const BestSellerSection = () => {
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery();

  const { data, isLoading } = useSWR("/products?limit=4", () =>
    productService.public.getAll({ limit: 4 }),
  );
  const products = Array.isArray(data) ? data : data?.data || [];

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="flex flex-col gap-0 px-8 lg:px-0">
      <div className="flex flex-col gap-3">
        {!isMobile ?? (
          <div className="flex items-center gap-3">
            <div className="w-4 h-8 bg-[#DB4444] rounded-sm" />
            <span className="text-[#DB4444] font-semibold text-sm">
              This Month
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-sm lg:text-2xl font-semibold tracking-tight">
            Best Selling Products
          </h2>
          <Link to="/shop">
            <Button small>View All</Button>
          </Link>
        </div>
      </div>
      <ProductRow
        title="Best Selling Products"
        tag="This Month"
        products={products}
        isLoading={isLoading}
        scrollRef={scrollRef}
        onScroll={scroll}
      />
    </div>
  );
};
