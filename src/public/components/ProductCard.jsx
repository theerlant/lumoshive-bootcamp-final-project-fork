import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, HeartOffIcon } from "lucide-react";
import { StarRating } from "./StarRating";
import { priceFormatter } from "@/shared/utils/priceFormatter";
import useSWR from "swr";
import { wishListService } from "../../shared/services/wishListService";
import { useSelector } from "react-redux";

export const ProductCard = ({
  product,
  onAddToWishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { data } = useSWR(["/wishlist", product.id], () =>
    wishListService.public.check(product.id),
  );

  const handleWishlistClick = (e, remove = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (!remove) {
      onAddToWishlist();
    } else {
      onRemoveFromWishlist();
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      onAddToCart();
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex flex-col min-w-[200px] max-w-[250px]">
      <div className="relative h-[250px] group/image overflow-hidden">
        <Link
          to={`/product/${product.id}`}
          className="block w-full h-full text-black"
        >
          <img
            src={`http://103.150.116.241:8082${product.images?.[0]?.image_url}`}
            className="w-full h-full rounded-sm object-contain px-12 bg-[#F5F5F5] transition-opacity"
            alt={product.name}
          />
        </Link>
        {data && isAuthenticated ? (
          <button
            onClick={(e) => handleWishlistClick(e, data.in_wishlist)}
            className="absolute top-3 right-3 p-2 bg-white hover:bg-gray-100 active:bg-gray-300 rounded-full shadow-sm z-10"
            aria-label="Add to Wishlist"
          >
            {data.in_wishlist ? <HeartOffIcon /> : <HeartIcon />}
          </button>
        ) : null}

        {product.stock ? (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-center font-medium translate-y-full group-hover/image:translate-y-0 transition-transform duration-300 ease-in-out z-10 hover:cursor-pointer"
          >
            Add To Cart
          </button>
        ) : null}
      </div>
      <Link to={`/product/${product.id}`}>
        <h4 className="font-medium mt-4 mb-1 group-hover:text-[#DB4444] transition-colors line-clamp-2">
          {product.name}
        </h4>
      </Link>

      <span className="font-medium text-[#DB4444] mb-1">
        {priceFormatter(product.price)}
      </span>
      <div className="flex gap-2 items-end">
        <StarRating rating={0} />
        <span className="font-semibold text-black/50">(0)</span>
      </div>
    </div>
  );
};
