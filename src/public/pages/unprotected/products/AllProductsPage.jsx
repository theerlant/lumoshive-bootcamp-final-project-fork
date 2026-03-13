import { useState, useEffect } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productService } from "@/shared/services/productService";
import { categoryService } from "@/shared/services/categoryService";
import shoppingCartService from "@/shared/services/shoppingCartService";
import { wishListService } from "@/shared/services/wishListService";
import { ProductCard } from "@/public/components/ProductCard";
import { Breadcrumbs } from "@/public/components/Breadcrumbs";
import { Button } from "@/public/components/Button";

const PAGE_LIMIT = 8;

export default function AllProductsPage() {
  // categoryId comes from URL when used as /category/:categoryId, otherwise undefined
  const { categoryId: paramCategoryId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState([]);

  // When a sidebar category is clicked, navigate to /category/:id (or /all for none)
  const handleCategorySelect = (id) => {
    setPage(1);
    if (id) navigate(`/category/${id}`);
    else navigate("/all");
  };

  const selectedCategory = paramCategoryId ?? null;

  // Categories sidebar
  const { data: catData } = useSWR(
    "/categories/select",
    categoryService.public.getForDropdown,
  );
  const categories = Array.isArray(catData) ? catData : catData?.data || [];

  // Products
  const swrKey = `/products?category=${selectedCategory ?? "all"}&page=${page}&search=${searchTerm}`;
  const { data: productData, isLoading } = useSWR(swrKey, () =>
    productService.public.getAll({
      page,
      limit: PAGE_LIMIT,
      categoryId: selectedCategory ?? undefined,
      search: searchTerm || undefined,
    }),
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (productData) {
      const newProducts = productData?.data || [];
      if (page === 1) {
        setAllItems(newProducts);
      } else {
        setAllItems((prev) => [...prev, ...newProducts]);
      }
    }
  }, [productData, page]); // Removed searchTerm dependency

  const totalPages = productData?.pagination?.total_pages ?? 1;
  const hasMore = page < totalPages;

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

  const activeLabel = searchTerm
    ? `Search Results for "${searchTerm}"`
    : (categories.find((c) => c.value === selectedCategory)?.label ??
      "All Products");

  return (
    <div className="w-full pb-20">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: activeLabel }]}
      />

      <div className="flex gap-8 mt-10">
        {/* Sidebar */}
        <aside className="w-40 shrink-0">
          <ul className="flex flex-col gap-3">
            <li>
              <button
                type="button"
                onClick={() => handleCategorySelect(null)}
                className={`text-sm text-left transition-colors ${
                  selectedCategory === null
                    ? "text-[#DB4444] font-semibold"
                    : "text-black hover:text-[#DB4444]"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.value}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect(cat.value)}
                  className={`text-sm text-left transition-colors ${
                    selectedCategory === cat.value
                      ? "text-[#DB4444] font-semibold"
                      : "text-black hover:text-[#DB4444]"
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-10 bg-[#DB4444] rounded-sm" />
            <h2 className="text-2xl font-semibold">{activeLabel}</h2>
          </div>

          {/* Grid */}
          {isLoading && page === 1 ? (
            <div className="grid grid-cols-4 gap-6">
              {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                <div
                  key={i}
                  className="h-[300px] rounded-sm bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : allItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-6 gap-y-10">
              {allItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  {...makeHandlers(product)}
                />
              ))}
            </div>
          )}

          {/* Show More */}
          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setPage((p) => p + 1)} loading={isLoading}>
                {isLoading ? "Loading..." : "Show More"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
