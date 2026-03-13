import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { productService } from "../../../../shared/services/productService";
import { Breadcrumbs } from "../../../components/BreadCrumbs";
import { StarRating } from "../../../components/StarRating";
import { ProductImages } from "../../../components/ProductImages";
import { ProductCard } from "../../../components/ProductCard";
import { priceFormatter } from "../../../../shared/utils/priceFormatter";
import { toTitleCase } from "../../../../shared/utils/toTitleCase";
import {
  HeartIcon,
  HeartOffIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  TruckElectricIcon,
} from "lucide-react";
import { Button } from "../../../components/Button";
import shoppingCartService from "../../../../shared/services/shoppingCartService";
import { wishListService } from "../../../../shared/services/wishListService";
import { toast } from "react-toastify";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = useSWR(`/products/${id}`, () =>
    productService.public.getById(id),
  );

  // Check if main product is in wishlist
  const { data: wishlistData, mutate: mutateWishlist } = useSWR(
    ["/wishlist", id],
    () => wishListService.public.check(id),
  );

  if (data) {
    const stock = data.stock || 0;
    const categoryId = data.category.id;

    const handleQuantityChange = (e) => {
      let value = parseInt(e.target.value, 10);
      if (isNaN(value) || value < 1) value = 1;
      if (value > stock) value = stock;
      setQuantity(value);
    };

    const handleMenuProps = (amount) => {
      let newAmount = quantity + amount;
      if (newAmount < 1) newAmount = 1;
      if (newAmount > stock) newAmount = stock;
      setQuantity(newAmount);
    };

    const handleVariantSelect = (group, variant) => {
      setSelectedVariants((prev) => ({
        ...prev,
        [group]: variant,
      }));
    };

    const handleAddtoCart = async () => {
      try {
        await shoppingCartService.addItem(id, quantity);
        toast.success(`Successfully added ${quantity}x ${data.name} to cart`);
      } catch (error) {
        toast.error(`Error adding item to cart: ${error.message || error}`);
      }
    };

    const handleWishlistClick = (e) => {
      e.preventDefault();

      if (!wishlistData) return;

      wishlistData.in_wishlist
        ? handleRemoveFromWishlist()
        : handleAddToWishlist();
    };

    const handleAddToWishlist = async () => {
      try {
        await wishListService.public.add(id);
        toast.success(`Added ${data.name} to wishlist`);
        mutateWishlist();
      } catch (error) {
        toast.error(`Error adding item to wishlist: ${error.message || error}`);
      }
    };

    const handleRemoveFromWishlist = async () => {
      try {
        await wishListService.public.remove(id);
        toast.success(`Removed ${data.name} from wishlist`);
        mutateWishlist();
      } catch (error) {
        toast.error(
          `Error removing item from wishlist: ${error.message || error}`,
        );
      }
    };

    return (
      <div className="w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: data.category.name,
              href: `/all/${data.category.id}`,
            },
            { label: data.name },
          ]}
        />
        {/* Main Product Detail */}
        <div className="grid grid-cols-[1.5fr_1fr] gap-8">
          <ProductImages images={Array.from(data.images)} />
          <section id="data" className="min-w-0">
            <h1 className="text-2xl font-semibold font-title mb-2">
              {data.name}
            </h1>
            <div className="flex gap-2 items-center mb-2">
              <StarRating rating={0} />
              <span className="opacity-50">( 0 Reviews )</span>
              <div className="h-5 w-0.25 bg-black/50 mx-2" />
              {data.stock > 0 ? (
                <span className="text-[#00FF66]/60">In Stock</span>
              ) : (
                <span className="text-[#DB4444]/60">Out of Stock</span>
              )}
            </div>
            <h2 className="text-2xl font-title mb-4">
              {priceFormatter(data.price)}
            </h2>
            <p className="text-sm h-50 overflow-scroll">{data.description}</p>
            <div className="w-full h-0.25 bg-black/50 my-6" />
            {Object.keys(data.variants).map((varGroup) => (
              <div key={varGroup} className="flex items-center">
                <h3 className="text-xl mr-4">{toTitleCase(varGroup)}:</h3>
                <div className="flex gap-2 *:shrink-0 overflow-x-auto">
                  {data.variants[varGroup].map((v, i) => {
                    const isSelected = selectedVariants[varGroup] === v;
                    return (
                      <button
                        key={i}
                        disabled={!stock}
                        onClick={() => handleVariantSelect(varGroup, v)}
                        className={`border rounded-sm p-1 transition-colors ${
                          isSelected && stock
                            ? "bg-[#DB4444] text-white border-[#DB4444]"
                            : stock
                              ? "border-black/50 hover:bg-black/10 hover:border-black/50"
                              : "opacity-50"
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Checkout action */}
            <div className="flex w-full items-center my-10 gap-2">
              <div className="flex items-center rounded-sm border border-black/50 overflow-hidden bg-white">
                <button
                  onClick={() => handleMenuProps(-1)}
                  disabled={quantity <= 1}
                  className="p-2 border-r border-black/50 hover:bg-[#DB4444] hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  <MinusIcon />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={stock ? quantity : 0}
                  onChange={handleQuantityChange}
                  disabled={stock === 0}
                  className="w-14 text-center text-xl disabled:text-black/50 font-medium outline-none remove-arrow bg-transparent"
                  min={1}
                  max={stock}
                />
                <button
                  onClick={() => handleMenuProps(1)}
                  disabled={quantity >= stock}
                  className="p-2 border-l border-black/50 hover:bg-[#DB4444] hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  <PlusIcon />
                </button>
              </div>
              <div className="flex-1" />
              <div className="self-stretch *:h-full *:py-0 *:px-4">
                <Button disabled={!stock} onClick={handleAddtoCart}>
                  Add to cart
                </Button>
              </div>
              <button
                onClick={(e) =>
                  handleWishlistClick(e, wishlistData?.in_wishlist)
                }
                className="py-2 px-2 flex items-center justify-center rounded-sm bg-transparent outline -outline-offset-2 hover:outline-black/50 hover:text-[#DB4444] transition-colors"
                aria-label="Add to Wishlist"
              >
                {wishlistData?.in_wishlist ? <HeartOffIcon /> : <HeartIcon />}
              </button>
            </div>
            {/* Delivery claims */}
            <div className="rounded-sm border border-black/50 *:p-4 w-full">
              <div className="grid grid-cols-[auto_1fr] place-items-center gap-x-4 gap-y-1 border-b border-black/50">
                <TruckElectricIcon className="row-span-2" size={28} />
                <h4 className="w-full font-medium">Free Delivery</h4>
                <p className="w-full text-xs font-medium">
                  <Link to="#" className="underline">
                    Enter your postal code for Delivery Availability
                  </Link>
                </p>
              </div>
              <div className="grid grid-cols-[auto_1fr] place-items-center gap-x-4 gap-y-1">
                <RotateCcwIcon className="row-span-2" size={28} />
                <h4 className="w-full font-medium">Return Delivery</h4>
                <p className="w-full text-xs font-medium">
                  Free 30 Days Delivery Returns.{" "}
                  <Link to="#" className="underline">
                    Details
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
        {data ? <RelatedProductList categoryId={categoryId} /> : null}
      </div>
    );
  }
};

const RelatedProductList = ({ categoryId }) => {
  const { data, isLoading } = useSWR(["/products", categoryId], () =>
    productService.public.getAll({ limit: 4, categoryId: categoryId }),
  );

  const { mutate } = useSWRConfig();

  const handleAddToWishlist = async (product) => {
    try {
      await wishListService.public.add(product.id);
      toast.success(`Added ${product.name} to wishlist`);
      mutate(["/wishlist", product.id]);
    } catch (error) {
      toast.error(`Error adding item to wishlist: ${error.message || error}`);
    }
  };

  const handleRemoveFromWishlist = async (product) => {
    try {
      await wishListService.public.remove(product.id);
      toast.success(`Removed ${product.name} from wishlist`);
      mutate(["/wishlist", product.id]);
    } catch (error) {
      toast.error(
        `Error removing item from wishlist: ${error.message || error}`,
      );
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await shoppingCartService.addItem(product.id, 1);
      toast.success(`Successfully added ${product.name} to cart`);
    } catch (error) {
      toast.error(`Error adding item to cart: ${error.message || error}`);
    }
  };

  if (data) {
    return (
      <>
        {/* Related Product (by category for now) */}
        <div className="flex gap-4 items-center mt-16 mb-8">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm" />
          <h2 className="text-[#DB4444] font-semibold">Related Item</h2>
        </div>
        {/* Product card */}
        <div className="flex gap-4 overflow-x-auto pb-4 *:shrink-0">
          {data.data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToWishlist={() => handleAddToWishlist(product)}
              onRemoveFromWishlist={() => handleRemoveFromWishlist(product)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </>
    );
  }
};
