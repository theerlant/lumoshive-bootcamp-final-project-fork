import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { InputField } from "../../../components/InputField";
import { stockService } from "../../../../shared/services/stockService";

export default function AdminStockFormPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await stockService.admin.getAllLog(1, 50);
        const data = res?.data?.data || res?.data || [];
        setProducts(data);
      } catch (err) {
        console.error("Gagal load produk:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const prodId = e.target.value;
    const findProd = products.find(p => p.product_id === prodId);
    setSelectedProduct(findProd);
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !newStock) return alert("Lengkapi data!");

    try {
      //  Quantity yang dikirim adalah (stok Baru-stok Lama) seharusnya, cman output ga sesuai
      //const oldStock = selectedProduct.new_stock || 0;
      // const adjustmentQuantity = Number(newStock) - oldStock;
      const adjustmentQuantity = Number(newStock);

      await stockService.admin.adjust(
        selectedProduct.product_id,
        adjustmentQuantity,
        description
      );

      navigate("/admin/stocks", { 
        state: { successMessage: true, successType: "success-add" } 
      });
    } catch (err) {
      alert("Gagal adjust stok");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold flex items-center gap-2">
           <button onClick={() => navigate(-1)} className="hover:text-gray-500">&lt;</button> 
           Add Stock 
        </h1>
        <Breadcrumbs items={[
          { label: "Home", href: "/admin" }, 
          { label: "Stock", href: "/admin/stocks" },
          { label: "Add Stock", href: "" }
        ]} />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-6">

          {/* Opsi Pilihan produk */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <select 
              className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#DB4444]"
              onChange={handleProductChange}
            >
               <option value="">Select Product</option>
               {products.map((p) => (
                   <option key={p.id} value={p.product_id}>{p.product_name}</option>
               ))}
            </select>
          </div>

          {/* stok saat ini */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Stock</label>
            <div className="p-3 bg-gray-100 rounded-lg text-gray-700 font-bold">
              {selectedProduct ? selectedProduct.new_stock : 0}
            </div>
          </div>


          {/* Inputan new stok */}
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">New Stock</label>
            <InputField 
              placeholder="Masukkan jumlah stok terbaru" 
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
            <p className="text-sm text-red-500 ">Jika ingin mengurangi stok masukkan "-" contoh "-5"</p>

            {selectedProduct && newStock && (
              <p className="text-sm text-gray-500 mt-1">Stok akhir/current stock akan menjadi: <span className="font-bold text-[#DB4444]">
                {(selectedProduct.new_stock || 0) + Number(newStock)}
                </span>
              </p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              className="w-full border p-3 rounded-lg bg-gray-50"
              placeholder="Contoh: Restock dari Supplier A"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-10">
          <Button variant="outline" onClick={() => navigate(-1)} className="border-red-500 text-red-500 px-8 rounded-lg">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-[#DB4444] text-white px-8 rounded-lg">Add Stock</Button>
        </div>
      </div>
    </div>
  );
}




//Yang ini dihapus juga gapapa
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Breadcrumbs } from "../../../components/Breadcrumbs";
// import Button from "../../../components/Button";
// import { InputField } from "../../../components/InputField";
// import { stockService } from "../../../../shared/services/stockService";
// import { productService } from "../../../../shared/services/productService";

// export default function AdminStockFormPage({ mode }) {
//   const navigate = useNavigate();
//   // const { id } = useParams();
//   const [products, setProducts] = useState([]); 
//   const [formData, setFormData] = useState({ productId: "", quantity: "", description: "" });


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await productService.admin.getAll(); // Sesuaikan dengan service-mu
//         setProducts(res.data || []);
//       } catch (err) {
//         console.error("Gagal ambil produk", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSubmit = async () => {

//     if (!formData.product_id || !formData.quantity) {
//         alert("Pilih produk dan isi jumlah stok!");
//         return;
//     }


//     try {
//       if (mode === 'add') {
//         await stockService.admin.adjust(
//           // formData.productId,
//           Number(formData.product_id,), 
//           Number(formData.quantity), 
//           formData.description);
//         navigate("/admin/stocks", { 
//           state: { successMessage: true, successType: "success-add" } 
//         });
//       // } else {
//       //   // Logika update/edit (jika API tersedia)
//       //   navigate("/admin/stocks", { 
//       //     state: { successMessage: true, successType: "success-update" } 
//       //   });
//       }
//     } catch (err) { 
//       // alert("Gagal menyimpan data");
//       alert(err.response?.data?.message || "Gagal menyimpan data"); 
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//            <button onClick={() => navigate(-1)} className="hover:text-gray-500">&lt;</button> 
//            {mode === 'add' ? 'Add' : 'Edit'} Stock
//         </h1>
//         <Breadcrumbs items={[
//           { label: "Home", path: "/admin" }, 
//           { label: "Stock", path: "/admin/stocks" },
//           { label: mode === 'add' ? "Add Stock" : "Edit Stock", path: "" }
//         ]} />
//       </div>

//       <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Product</label>
//             <select 
//               className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#DB4444]"
//               value={formData.product_id}
//               onChange={(e) => setFormData({...formData, productId: e.target.value})}
//             >
//                <option value="">Select Product</option>
//                {products.map(p => (
//                    <option key={p.id} value={p.id}>{p.name}</option>
//                ))}
//             </select>
//           </div>


//           {/* <div className="space-y-2">
//             <label className="text-sm font-medium">Current Stock</label>
//             <div className="p-3 bg-gray-100 rounded-lg text-gray-500">0</div>
//           </div> */}

//           <div className="col-span-2 md:col-span-1 space-y-2">
//             <label className="text-sm font-medium">Quantity Adjustment</label>
//             <InputField 
//               placeholder="Contoh: 10 untuk tambah, -5 untuk kurang" 
//               type="number"
//               value={formData.quantity}
//               onChange={(e) => setFormData({...formData, quantity: e.target.value})}
//             />
//           </div>


//           {/* <div className="col-span-2 space-y-2">
//             <label className="text-sm font-medium">New Stock</label>
//             <InputField 
//               placeholder="Enter New Stock" 
//               type="number"
//               onChange={(e) => setFormData({...formData, quantity: e.target.value})}
//             />
//           </div> */}





//           <div className="col-span-2 space-y-2">
//             <label className="text-sm font-medium">Description</label>
//             <textarea 
//               className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:border-[#DB4444]"
//               placeholder="Enter Description"
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//             />
//           </div>
//         </div>
        
//         <div className="flex justify-end gap-3 mt-10">
//           <Button 
//             variant="outline" 
//             onClick={() => navigate(-1)} 
//             className="border-red-500 text-red-500 px-8 rounded-lg"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSubmit} 
//             className="bg-[#DB4444] text-white px-8 rounded-lg"
//           >
//             {/* {mode === 'add' ? 'Add Stock' : 'Save'} */}
//             {mode === 'add' ? 'Submit Adjustment' : 'Save'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



// export default function AdminStockFormPage({ mode }) {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Ambil ID jika mode edit
//   const [formData, setFormData] = useState({ productId: "", quantity: "", description: "" });

//   const handleSubmit = async () => {
//     try {
//       if (mode === 'add') {
//         await stockService.admin.adjust(formData.productId, Number(formData.quantity), formData.description);
//         // Kembali ke list sambil bawa state untuk memicu modal sukses
//         navigate("/admin/stocks", { state: { successMessage: true, successType: "success-add" } });
//       } else {
//         // Logika update di sini
//         navigate("/admin/stocks", { state: { successMessage: true, successType: "success-update" } });
//       }
//     } catch (err) { alert("Gagal menyimpan data"); }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//            <button onClick={() => navigate(-1)}>&lt;</button> {mode === 'add' ? 'Add' : 'Edit'} Stock
//         </h1>
//         <Breadcrumbs items={[
//           { label: "Home", path: "/admin" }, 
//           { label: "Stock", path: "/admin/stocks" },
//           { label: mode === 'add' ? "Add Stock" : "Edit Stock", path: "" }
//         ]} />
//       </div>

//       <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//         <div className="grid grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Product</label>
//             <select className="w-full border p-3 rounded-lg bg-gray-50">
//                <option>Select Product</option>
//             </select>
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Current Stock</label>
//             <div className="p-3 bg-gray-100 rounded-lg text-gray-500">10</div>
//           </div>
//           <div className="col-span-2 space-y-2">
//             <label className="text-sm font-medium">New Stock</label>
//             <InputField placeholder="Enter New Stock" />
//           </div>
//         </div>
        
//         <div className="flex justify-end gap-3 mt-10">
//           <Button variant="outline" onClick={() => navigate(-1)} className="border-red-500 text-red-500 px-8">Cancel</Button>
//           <Button onClick={handleSubmit} className="bg-[#DB4444] text-white px-8">
//             {mode === 'add' ? 'Add Stock' : 'Save'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
