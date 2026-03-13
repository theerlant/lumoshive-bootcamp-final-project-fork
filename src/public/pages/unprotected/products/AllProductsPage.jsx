import React, { useState, useEffect } from "react";
import  ProductCard  from "../../../../admin/components/Productcard"; 
import { productService } from "../../../../shared/services/productService";
import shoppingCartService from "../../../../shared/services/shoppingCartService";


export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [displayTitle, setDisplayTitle] = useState("All Product");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.public.getCategories();
        setCategories(res.data || []); 
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (catId) => {
    setLoading(true);
    try {
      const res = await productService.public.getAll({
        page: 1,
        limit: 50,
        categoryId: catId || undefined 
      });
      setProducts(res.data || []); 
    } catch (error) {
      console.error("Gagal ambil produk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (id, name) => {
    setSelectedCategory(id);
    setDisplayTitle(name);
    setVisibleCount(6);
  };

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
    <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">
      {/* sidebar */}
      <aside className="w-64 border-r pr-5">
        <h3 className="font-bold mb-4">Categories</h3>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => handleCategorySelect("", "All Product")}
              className={`text-sm ${selectedCategory === "" ? "text-red-500 font-bold" : "text-black"}`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategorySelect(cat.id, cat.name)}
                className={`text-sm transition-all ${
                  selectedCategory === cat.id ? "text-red-500 font-bold" : "text-black hover:text-red-500"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* main content */}
      <main className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div> 
          <h2 className="text-2xl font-semibold">{displayTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.slice(0, visibleCount).map((item) => (
              <ProductCard key={item.id} product={item} onAddToCart={handleAddToCart} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

        {/* tombol show more */}
        {!loading && products.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition font-medium"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
