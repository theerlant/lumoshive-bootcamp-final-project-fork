import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  // const BASE_URL = "http://localhost:8082";
  // const BASE_URL = "http://103.150.116.241:8082";
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150?text=No+Image";
    if (url.startsWith("http")) return url;
    // Gunakan BASE_URL yang sudah didefinisikan di atas
    return `${BASE_URL}${url}`;
  };

  const rawImage =
    product.images?.find((img) => img.is_primary)?.image_url ||
    product.images?.[0]?.image_url;

  const primaryImage = getImageUrl(rawImage);

  return (
    <div className="group relative bg-white rounded-md transition-all duration-300">
      <div className="relative aspect-square bg-[#F5F5F5] flex items-center justify-center overflow-hidden rounded-md">
        {product.is_new && (
          <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-3 py-1 rounded">
            NEW
          </span>
        )}

        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            if (onAddToCart) {
              onAddToCart(product.id);
            }
          }}
          className="absolute bottom-0 w-full bg-black text-white py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ShoppingCart size={18} />
          <span className="text-sm font-medium">Add To Cart</span>
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-semibold text-base truncate">{product.name}</h3>
        <div className="flex gap-3">
          <span className="text-[#DB4444] font-medium">
            Rp{Number(product.price || 0).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-[#FFAD33]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-gray-400 text-xs">(65)</span>
        </div>
      </div>
    </div>
  );
}
