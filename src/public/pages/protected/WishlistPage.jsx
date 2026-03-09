import PublicLayout from "../../layouts/PublicLayout";
import useSWR from "swr";
import { wishListService } from "../../../shared/services/wishListService";
import { LucideTrash, LucideShoppingCart, LucideEye } from "lucide-react";
export default function WishlistPage() {
  // 1. Fetch Data Wishlist
  const { data, isLoading, mutate } = useSWR("wishlist", () => 
    wishListService.public.get()
  );

  const wishlistItems = data?.data || [];

  // 2. Handler Hapus dari Wishlist
  const handleRemove = async (productId) => {
    try {
      await wishListService.public.remove(productId);
      mutate(); // Refresh data tanpa reload
    } catch (err) {
      console.error("Gagal hapus wishlist", err);
    }
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        
        {/* HEADER WISHLIST */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-normal text-black">
            Wishlist ({wishlistItems.length})
          </h2>
          <button className="border border-gray-300 px-10 py-4 rounded font-medium hover:bg-gray-50 transition-all">
            Move All To Bag
          </button>
        </div>

        {/* WISHLIST GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {isLoading ? (
            <div className="col-span-full text-center py-10">Loading wishlist...</div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="group">
                {/* Image Container */}
                <div className="relative bg-[#F5F5F5] rounded flex items-center justify-center h-[250px] overflow-hidden">
                  {/* Badge Discount (Kalo ada) */}
                  {item.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded">
                      -{item.discount}%
                    </span>
                  )}
                  
                  {/* Delete Action */}
                  <button 
                    onClick={() => handleRemove(item.product_id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-[#DB4444] hover:text-white transition-colors"
                  >
                    <LucideTrash size={18} />
                  </button>

                  <img 
                    src={item.product?.image_url} 
                    alt={item.product?.name} 
                    className="w-40 h-40 object-contain"
                  />

                  {/* Add To Cart Overlay */}
                  <button className="absolute bottom-0 w-full bg-black text-white py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <LucideShoppingCart size={18} />
                    <span className="text-xs">Add To Cart</span>
                  </button>
                </div>

                {/* Info Produk */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-black truncate">{item.product?.name}</h3>
                  <div className="flex gap-3 items-center">
                    <span className="text-[#DB4444] font-medium">${item.product?.price}</span>
                    {item.product?.old_price && (
                      <span className="text-gray-400 line-through text-sm">${item.product?.old_price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SECTION: JUST FOR YOU */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
            <h2 className="text-xl font-normal text-black tracking-wide">Just For You</h2>
          </div>
          <button className="border border-gray-300 px-10 py-4 rounded font-medium hover:bg-gray-50 transition-all">
            See All
          </button>
        </div>

        {/* JUST FOR YOU GRID (Dummy atau Fetch Rekomendasi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {/* Contoh Card Rekomendasi */}
           <div className="group">
              <div className="relative bg-[#F5F5F5] rounded flex items-center justify-center h-[250px] overflow-hidden">
                <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-3 py-1 rounded">NEW</span>
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full">
                  <LucideEye size={18} />
                </button>
                <img src="/path-to-image.png" className="w-40 h-40 object-contain" alt="product" />
                <button className="absolute bottom-0 w-full bg-black text-white py-2 flex items-center justify-center gap-2">
                   <LucideShoppingCart size={18} />
                   <span className="text-xs">Add To Cart</span>
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">ASUS FHD Gaming Laptop</h3>
                <div className="flex gap-3 items-center">
                  <span className="text-[#DB4444] font-medium">$960</span>
                  <span className="text-gray-400 line-through text-sm">$1160</span>
                </div>
                <div className="flex text-yellow-400 text-xs">⭐⭐⭐⭐⭐ <span className="text-gray-400 ml-2">(65)</span></div>
              </div>
           </div>
        </div>

      </div>
    </PublicLayout>
  );
}