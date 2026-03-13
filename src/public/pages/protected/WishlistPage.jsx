/** biome-ignore-all lint/suspicious/noArrayIndexKey: <It is what it is> */
import { useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { wishListService } from "@/shared/services/wishListService";
import { productService } from "@/shared/services/productService";
import shoppingCartService from "@/shared/services/shoppingCartService";
import { ProductCard } from "@/public/components/ProductCard";
import { Breadcrumbs } from "@/public/components/Breadcrumbs";
import { Button } from "@/public/components/Button";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";

const LIMIT = 12;

const WishlistItem = ({ item, onAddToCart, onRemoveFromWishlist }) => {
  const { data: product, isLoading } = useSWR(
    `/products/${item.product_id}`,
    () => productService.public.getById(item.product_id),
  );

  if (isLoading) {
    return <div className="h-[300px] rounded-sm bg-gray-100 animate-pulse" />;
  }

  return (
    <ProductCard
      product={product}
      onAddToCart={onAddToCart}
      onRemoveFromWishlist={onRemoveFromWishlist}
      isWishlisted
    />
  );
};

export default function WishlistPage() {
  const [page, setPage] = useState(1);

  const isMobile = useMediaQuery();

  const { data, isLoading, mutate } = useSWR(`/wishlist?page=${page}`, () =>
    wishListService.public.get(page, LIMIT),
  );

  const wishlistItems = data?.items || [];
  const totalItems = data?.total_items ?? 0;
  const totalPages = data?.total_pages ?? 1;
  const hasMore = page < totalPages;

  const handleRemove = (productId) => {
    wishListService.public
      .remove(productId)
      .then(() => {
        toast.success("Removed from wishlist");
        mutate();
      })
      .catch(() => toast.error("Failed to remove item"));
  };

  const handleAddToCart = (productId) => {
    shoppingCartService
      .addItem(productId, 1)
      .then(() => toast.success("Added to cart!"))
      .catch(() => toast.error("Failed to add to cart"));
  };

  const handleMoveAllToCart = () => {
    Promise.all(
      wishlistItems.map((item) =>
        shoppingCartService.addItem(item.product_id, 1),
      ),
    )
      .then(() => toast.success("All items added to cart!"))
      .catch(() => toast.error("Some items failed to add"));
  };

  return (
    <div className="w-full pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: `Wishlist (${totalItems})` },
        ]}
      />

      {/* Header */}
      <div className="flex justify-between items-center mt-10 mb-8">
        <div className="flex items-center gap-3">
          <div className="hidden lg:block w-4 h-10 bg-[#DB4444] rounded-sm" />
          {/* Desktop */}
          {isMobile ? (
            <h2 className="block lg:hidden text-sm font-semibold">
              Wishlist {totalItems}
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold">
              Wishlist{" "}
              <span className="text-black/40 font-normal text-lg">
                ({totalItems})
              </span>
            </h2>
          )}
        </div>
        {isMobile ? (
          <button
            type="button"
            onClick={handleMoveAllToCart}
            className="text-[#DB4444] text-xs"
          >
            Move All to Bag
          </button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleMoveAllToCart}
            disabled={wishlistItems.length === 0}
          >
            Move All To Bag
          </Button>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-4 gap-6 gap-y-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton ${i}`}
              className="h-[300px] rounded-sm bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
          <Link to="/all">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 gap-y-10">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onAddToCart={() => handleAddToCart(item.product_id)}
                onRemoveFromWishlist={() => handleRemove(item.product_id)}
              />
            ))}
          </div>

          {/* Show More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
                Show More
              </Button>
            </div>
          )}
        </>
      )}

      {/* Just For You — static placeholder */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-4 h-10 bg-[#DB4444] rounded-sm" />
            <h2 className="text-2xl font-semibold">Just For You</h2>
          </div>
          <Link to="/all">
            <Button variant="outlined">See All</Button>
          </Link>
        </div>
        <p className="text-gray-400 text-sm italic">
          Product recommendations coming soon.
        </p>
      </div>
    </div>
  );
}
