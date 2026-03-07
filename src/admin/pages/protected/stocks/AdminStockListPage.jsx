import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Search, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { InputField } from "../../../components/InputField";
import { TableWrapper, TableHead, TableHeadCol, TableBody, TableRow, TableCell } from "../../../components/Table";
import { PaginationNavigation, PaginationInfo } from "../../../components/Pagination";
import { IconButton } from "../../../components/IconButton";
import { stockService } from "../../../../shared/services/stockService";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminStockListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchStocks = async () => {
  setLoading(true);
  try {
   
    const currentSearch = search?.trim() || undefined;
    const res = await stockService.admin.getAllLog(page, 10, currentSearch);
    console.log("Struktur asli dari client.js:", res);
    const actualData = res?.data || res?.data?.data || [];
    const pagination = res?.pagination || {};

    setStocks(actualData);
    setTotalItems(pagination.total_items || actualData.length || 0);
  } catch (err) {
    console.error("Gagal mengambil data stock:", err);
    setStocks([]);
  } finally {
    setLoading(false);
  }
};
  
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStocks();
    }, 500);
    return () => clearTimeout(handler);
  }, [page, search]);

  useEffect(() => {
    if (location.state?.successMessage) {
      setModalType(location.state.successType);
      window.history.replaceState({}, document.title);
      setTimeout(() => setModalType(null), 3000);
    }
  }, [location]);

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await stockService.admin.deleteLog(selectedItem.id);
      setModalType("success-delete");
      fetchStocks();
      setTimeout(() => setModalType(null), 2000);
    } catch (err) {
      alert(err.message || "Gagal menghapus stok");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
          <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Stock", href: "/admin/stocks" }]} />
        </div>
        <Button onClick={() => navigate("/admin/stocks/add")} className="bg-[#DB4444] rounded-lg px-3 py-2 text-white">
          Add New Stock
        </Button>
      </div>


      <div className="flex justify-between items-start">
        <div className="max-w-md">
        <InputField 
          placeholder="Search by product name "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          actions={<Search size={18} className="text-gray-400" />}
        />
      </div>

      <div className="bg-purple-100 text-purple-600 p-2 rounded-lg text-center min-w-[80px]">
        <div className="text-xl font-bold">{totalItems}</div>
        <div className="text-[10px]">Total Stock</div>
      </div> 
      </div>
      

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <TableWrapper>
          <TableHead>
            <TableHeadCol title="Product Name" />
            <TableHeadCol title="SKU" />
            <TableHeadCol title="Quantity" />
            {/* <TableHeadCol title="Type" /> */}
            <TableHeadCol title="Description" />
            <TableHeadCol title="Action" />
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10">Loading...</TableCell></TableRow>
            ) : stocks.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400">No data available</TableCell></TableRow>
            ) : (
              stocks.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product_name}</TableCell>
                  <TableCell>{item.product_sku}</TableCell>
                  <TableCell>
                    <span className="font-bold text-gray-700">{item.quantity}</span>
                  </TableCell>
                  {/* <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.action_type === 'subtract' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.action_type}
                    </span>
                  </TableCell> */}
                  <TableCell className="text-gray-500 text-sm italic">{item.description || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton onClick={() => navigate(`/admin/stocks/detail/${item.id}`)}><Eye size={18} /></IconButton>
                      <IconButton onClick={() => { setSelectedItem(item); setModalType("delete"); }}><Trash2 size={18} /></IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </TableWrapper>

        <div className="mt-4 flex justify-between items-center">
          <PaginationInfo currentPage={page} limit={10} total={totalItems} />
          <PaginationNavigation 
            totalPages={Math.ceil(totalItems / 10) || 1} 
            currentPage={page} 
            onPageChange={setPage} 
          />
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            {modalType === "delete" && (
              <div className="space-y-6">
                <div className="mx-auto w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Trash2 className="text-red-500" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Delete Stock Log?</h2>
                  <p className="text-gray-500 mt-2">This action cannot be undone.</p>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 border border-gray-300 hover:bg-gray-50" onClick={() => setModalType(null)}>Cancel</Button>
                  <Button className="flex-1 bg-red-500 text-white hover:bg-red-600" onClick={handleDelete}>Yes, Delete</Button>
                </div>
              </div>
            )}
            
            {modalType.startsWith("success") && (
              <div className="space-y-6">
                <CheckCircle className="mx-auto text-emerald-400" size={80} strokeWidth={1} />
                <h2 className="text-xl font-medium">
                  Success! Stock was {modalType.split("-")[1]}ed.
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}




// Syntax dibawah ini dihapus juga gapapa hehehe
// export default function AdminStockListPage() {
//   // State Utama
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [search, setSearch] = useState("");

//   // State Modal & Alur Kerja (Flow)
//   const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'view' | 'delete' | 'success-add' | 'success-edit' | 'success-delete'
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [formData, setFormData] = useState({ productId: "", quantity: "", description: "" });


//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const res = await stockService.admin.getAllLog(page, 10);
//       // Menyesuaikan struktur data.data dari Postman kamu
//       setStocks(res.data?.data || []);
//       setTotalItems(res.data?.pagination?.total_items || 0);
//     } catch (err) {
//       console.error(err);
//     } finally { 
//         setLoading(false);     
//     }

// //     setStocks([{
// //     id: 1,
// //     product_name: "Laptop HP",
// //     product_sku: "Warna: Hitam",
// //     quantity: 3,
// //     description: "Pembelian oleh pelanggan"
// //   }]);
//   };

//   useEffect(() => { fetchStocks(); }, [page]);

//   // Handler Actions
//   const handleAddStock = async () => {
//     try {
//       await stockService.admin.adjust(formData.productId, Number(formData.quantity), formData.description);
//       setModalType("success-add");
//       fetchStocks();
//     } catch (err) { alert("Gagal tambah stok"); }
//   };

// const handleDelete = async () => {
//   if (!selectedItem) return;
  
//   try {
//     // Memanggil API delete dengan ID yang benar dari log
//     const res = await stockService.admin.deleteLog(selectedItem.id);
    
//     if (res.data.success) {
//       setModalType("success-delete"); // Memunculkan gambar centang hijau (delete_stock_succesful.jpg)
      
//       // Beri jeda 2 detik lalu tutup modal dan refresh data
//       setTimeout(() => {
//         setModalType(null);
//         fetchStocks(); 
//       }, 2000);
//     }
//   } catch (err) {
//     console.error("Gagal menghapus:", err);
//     alert("Terjadi kesalahan saat menghapus stock log.");
//   }
// };

// const handleViewDetail = async (item) => {
//   setSelectedItem(item);
//   setModalType("view");
//   try {
//     // Memanggil API History sesuai penemuanmu di Postman
//     const res = await stockService.admin.getProductHistory(item.product_id);
//     console.log("History Data:", res.data);
//   } catch (err) {
//     console.error("Gagal mengambil history");
//   }
// };



//   return (
//     <div className="p-6 space-y-6 relative">
      
//       {/* 1. Header Section */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
//           <Breadcrumbs items={[{ label: "Home", path: "/admin" }, { label: "Stock", path: "/admin/stocks" }]} />
//         </div>
//          <Button variant="primary" onClick={() => setModalType("add")} className="bg-[#DB4444] rounded-lg px-3 py-2 text-white">
//                  Add New Stock
//         </Button>
//       </div>

//         {/* Search, kalender,filter */}
//         <div className="flex justify-between items-start">

//             <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-3 bg-white-50">
//                     <Calendar size={18} className="text-gray-400" />
//                 </div>

//                 <div className="flex items-start">
//                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#DB4444]">
//                     <option>Select Filter</option>
//                     </select>
//                 </div>

//                 <div className="flex justify-between items-start ">
//                      <InputField 
//                         placeholder="Search"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         actions={<Search size={18} className="text-gray-400 " />}
//                     />
//                 </div>

//             </div>


//             <div className="bg-purple-100 text-purple-600 p-2 rounded-lg text-center min-w-[80px]">
//                 <div className="text-xl font-bold">{totalItems}</div>
//                 <div className="text-[10px]">Total Stock</div>
//             </div>            
           
//         </div>

        



//       {/* 2. Table Data */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//         <TableWrapper>
//           <TableHead>
//             <TableHeadCol title="Product Name" sort="none" />
//             <TableHeadCol title="Varian Product" sort="none" />
//             <TableHeadCol title="Quantity" sort="none" />
//             <TableHeadCol title="Description" sort="none" />
//             <TableHeadCol title="Action" />
//           </TableHead>
//           <TableBody>
//             {stocks.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.product_name}</TableCell>
//                 <TableCell>{item.product_sku}</TableCell>
//                 <TableCell>
//                   <span className={`font-bold ${item.quantity < 5 ? "text-red-500" : "text-emerald-500"}`}>
//                     {item.quantity}
//                   </span>
//                 </TableCell>
//                 <TableCell>{item.description || "-"}</TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <IconButton onClick={() => { setSelectedItem(item); setModalType("view"); }}><Eye size={18} /></IconButton>
//                     <IconButton onClick={() => { setSelectedItem(item); setModalType("edit"); }}><Pencil size={18} /></IconButton>
//                     <IconButton onClick={() => { setSelectedItem(item); setModalType("delete"); }}><Trash2 size={18} /></IconButton>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </TableWrapper>
//         <div className="mt-4 flex justify-between items-center">
//           <PaginationInfo currentPage={page} limit={10} total={totalItems} />
//           <PaginationNavigation totalPages={Math.ceil(totalItems / 10)} currentPage={page} onPageChange={setPage} />
//         </div>
//       </div>


//       {/* 3. MODAL SYSTEM (Overlay) */}
//       {modalType && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            
//             {/* Modal: Delete Confirmation */}
//             {modalType === "delete" && (
//               <div className="space-y-6">
//                 <div className="mx-auto w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center">
//                   <Trash2 className="text-red-500" size={32} />
//                 </div>
//                 <h2 className="text-xl font-bold">Delete Stock?</h2>
//                 <p className="text-gray-500">Are you sure want to delete this stock?</p>
//                 <div className="flex gap-4">
//                   <Button className="flex-1 border border-red-500 text-red-500" onClick={() => setModalType(null)}>No</Button>
//                   <Button className="flex-1 bg-red-500 text-white" onClick={handleDelete}>Yes</Button>
//                 </div>
//               </div>
//             )}

//             {/* Modal: Success Messages (Add/Edit/Delete) */}
//             {(modalType.startsWith("success")) && (
//               <div className="space-y-6">
//                 <CheckCircle className="mx-auto text-emerald-400" size={80} strokeWidth={1} />
//                 <h2 className="text-xl font-medium">
//                   This stock was successfully {modalType.split("-")[1]}ed
//                 </h2>
//                 <button onClick={() => setModalType(null)} className="hidden">close</button>
//               </div>
//             )}

//             {/* Modal: Add/Edit/Detail Form */}
//             {(modalType === "add" || modalType === "edit" || modalType === "view") && (
//               <div className="text-left space-y-4">
//                 <h2 className="text-lg font-bold flex items-center gap-2">
//                   <button onClick={() => setModalType(null)}>&lt;</button> {modalType === 'add' ? 'Add' : 'Edit'} Stock
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-1">
//                     <label className="text-sm font-medium">Product</label>
//                     <select 
//                       disabled={modalType === "view"}
//                       className="w-full border p-2 rounded-lg bg-gray-50"
//                       onChange={(e) => setFormData({...formData, productId: e.target.value})}
//                     >
//                       <option>Select Product</option>
//                       {/* Mapping product list here */}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Current Stock</label>
//                     <div className="p-2 bg-gray-100 rounded-lg text-gray-500">10</div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">New Stock</label>
//                   <InputField 
//                     disabled={modalType === "view"}
//                     placeholder="Enter New Stock" 
//                     onChange={(e) => setFormData({...formData, quantity: e.target.value})}
//                   />
//                 </div>
//                 <div className="flex justify-end gap-3 mt-6">
//                   <Button className="border border-red-500 text-red-500 px-8" onClick={() => setModalType(null)}>Cancel</Button>
//                   {modalType !== "view" && (
//                     <Button 
//                       className="bg-[#DB4444] text-white px-8" 
//                       disabled={!formData.quantity}
//                       onClick={handleAddStock}
//                     >
//                       {modalType === 'add' ? 'Add Stock' : 'Save Changes'}
//                       {/* Add Stock */}
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// export default function AdminStockListPage() {
//   const [stocks, setStocks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);

//   // Fungsi untuk mengambil data dari backend
//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const response = await stockService.admin.getAllLog(page, 10, search);
//       // Asumsi response backend: { data: [...], meta: { total: 27 } }
//       setStocks(response.data || []);
//       setTotalItems(response.meta?.total || 0);
//     } catch (error) {
//       console.error("Gagal mengambil data stok:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, [page, search]);

//   // Definisi kolom tabel sesuai desain gambar kamu
//   const columns = [
//     {
//       header: "Product Name",
//       accessor: "product_name", // Sesuaikan dengan key dari API
//       render: (item) => <span className="font-medium text-gray-700">{item.product_name || "Laptop HP"}</span>,
//     },
//     {
//       header: "Varian Product",
//       accessor: "variant",
//       render: (item) => <span className="text-gray-500 text-sm">{item.variant || "Warna: Hitam"}</span>,
//     },
//     {
//       header: "Quantity",
//       accessor: "quantity",
//       render: (item) => {
//         // Logika warna: merah jika sedikit, hijau jika banyak (seperti di gambar)
//         const qty = item.quantity || 0;
//         const colorClass = qty < 5 ? "text-red-500" : "text-emerald-500";
//         return <span className={`font-bold ${colorClass}`}>{qty}</span>;
//       },
//     },
//     {
//       header: "Action",
//       render: (item) => (
//         <div className="flex gap-2 justify-center">
//           <IconButton icon={<Eye size={18} />} onClick={() => console.log("View", item.id)} />
//           <IconButton icon={<Pencil size={18} />} onClick={() => console.log("Edit", item.id)} />
//           <IconButton icon={<Trash2 size={18} />} onClick={() => console.log("Delete", item.id)} />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header & Judul */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
//           <Breadcrumbs 
//             items={[
//               { label: "Home", path: "/admin" },
//               { label: "Stock", path: "/admin/stocks" }
//             ]} 
//           />
//         </div>
//         <Button variant="primary" className="flex items-center gap-2">
//           <Plus size={18} /> Add New Stock
//         </Button>
//       </div>

//       {/* Filter & Search Bar */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
//         <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
//           <Calendar size={18} className="text-gray-400" />
//         </div>
        
//         <div className="w-64">
//           <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#DB4444]">
//             <option>Select Filter</option>
//           </select>
//         </div>

//         <div className="flex-1 max-w-md relative">
//           <InputField 
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             actions={<Search size={18} className="text-gray-400" />}
//           />
//         </div>

//         {/* Total Stock Indicator */}
//         <div className="ml-auto bg-purple-50 px-4 py-2 rounded-lg text-center">
//           <p className="text-purple-600 font-bold text-xl leading-none">120</p>
//           <p className="text-purple-400 text-[10px] uppercase font-bold">Total Stock</p>
//         </div>
//       </div>

//       {/* Tabel Data */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//       <TableWrapper>
//         <TableHead>
//           <TableHeadCol title="Product Name" sort="none" />
//           <TableHeadCol title="Varian Product" sort="none" />
//           <TableHeadCol title="Quantity" sort="none" />
//           <TableHeadCol title="Action" />
//         </TableHead>
//         <TableBody>
//           {stocks.length > 0 ? stocks.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <span className="font-medium text-gray-700">{item.product_name || "Laptop HP"}</span>
//               </TableCell>
//               <TableCell>
//                 <span className="text-gray-500">{item.variant || "Warna: Hitam"}</span>
//               </TableCell>
//               <TableCell>
//                 <span className={`font-bold ${item.quantity < 5 ? "text-red-500" : "text-emerald-500"}`}>
//                   {item.quantity || 0}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 <div className="flex gap-2">
//                   <IconButton onClick={() => console.log("View")}>
//                     <Eye size={18} />
//                   </IconButton>
//                   <IconButton onClick={() => console.log("Edit")}>
//                     <Pencil size={18} />
//                   </IconButton>
//                   <IconButton onClick={() => console.log("Delete")}>
//                     <Trash2 size={18} />
//                   </IconButton>
//                 </div>
//               </TableCell>
//             </TableRow>
//           )) : (
//             /* Row Dummy jika data kosong */
//             <TableRow>
//               <TableCell>Loading / No Data...</TableCell>
//               <TableCell>-</TableCell>
//               <TableCell>-</TableCell>
//               <TableCell>-</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </TableWrapper>
      
//       {/* Footer / Pagination yang sudah disesuaikan dengan komponen tim */}
//       <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
//         <PaginationInfo currentPage={page} limit={10} total={totalItems} />
//         <div className="flex items-center gap-6">
//           <PaginationLimiterButton limit={10} onLimitSet={(num) => console.log("Limit set to:", num)} />
//           <PaginationNavigation 
//             currentPage={page} 
//             totalPages={Math.ceil(totalItems / 10) || 1} 
//             onPageChange={(p) => setPage(p)} 
//           />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }