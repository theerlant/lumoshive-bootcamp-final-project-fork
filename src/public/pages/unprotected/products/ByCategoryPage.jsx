import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import  ProductCard  from "../../../../admin/components/Productcard";
import { productService } from "../../../../shared/services/productService";
import shoppingCartService from "../../../../shared/services/shoppingCartService";

export default function ByCategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  const currentCategory = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.public.getCategories();
        setCategories(res.data || []);
      } catch (err) { console.error(err); }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
      setVisibleCount(6);
    }
  }, [categoryId]);

  const fetchProductsByCategory = async (id) => {
    setLoading(true);
    try {
      const response = await productService.public.getAll({ 
        page: 1, 
        limit: 50, 
        categoryId: id 
      });
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Add to cart
  const handleAddToCart = async (productId) => {
    try {
      await shoppingCartService.addItem(productId, 1);
      alert("Produk berhasil ditambah ke keranjang!");
    } catch (error) {
      console.error("Gagal tambah ke keranjang", error);
      alert("Gagal menambahkan produk. Pastikan Anda sudah login.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
      <aside className="w-full md:w-64 border-r pr-5">
        <h3 className="font-bold mb-4">Categories</h3>
        <ul className="space-y-4">
          <li>
            <Link to="/products" className="text-gray-500 hover:text-[#DB4444] text-sm">
              ← Back to All
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link 
                to={`/category/${cat.id}`} 
                className={`block text-sm transition-colors ${categoryId === cat.id ? 'text-[#DB4444] font-bold' : 'text-black hover:text-[#DB4444]'}`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
          <h2 className="text-2xl font-bold">
            Category: {loading ? "Loading..." : (currentCategory?.name || "Product List")}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading Products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Belum ada produk untuk kategori ini.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, visibleCount).map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {products.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition font-medium"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}