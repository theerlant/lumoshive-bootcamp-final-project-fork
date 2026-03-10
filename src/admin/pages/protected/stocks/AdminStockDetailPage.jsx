import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { stockService } from "../../../../shared/services/stockService";

export default function AdminStockDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockDetail, setStockDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await stockService.admin.getAllLog(1, 100);
        const data = res?.data?.data || res?.data || [];
        const found = data.find((item) => item.id === id);
        setStockDetail(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="hover:text-gray-600">
            &lt;
          </button>
          Stock Log Detail
        </h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Stock", href: "/admin/stocks" },
            { label: "Detail", href: "" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="text-xs text-gray-400 uppercase font-bold">
            Product Name
          </label>
          <p className="text-lg font-medium">
            {stockDetail?.product_name || "-"}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase font-bold">
            SKU
          </label>
          <p className="text-lg font-medium">
            {stockDetail?.product_sku || "-"}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="text-xs text-gray-400 uppercase font-bold">
            Old Stock
          </label>
          <p className="text-xl font-bold text-gray-600">
            {stockDetail?.old_stock}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg">
          <label className="text-xs text-gray-400 uppercase font-bold">
            New Stock
          </label>
          <p className="text-xl font-bold text-emerald-600">
            {stockDetail?.new_stock}
          </p>
        </div>
        <div className="col-span-2">
          <label className="text-xs text-gray-400 uppercase font-bold">
            Description
          </label>
          <p className="text-gray-600 italic">
            "{stockDetail?.description || "No description"}"
          </p>
        </div>
      </div>
    </div>
  );
}

// Syntax dibawah ini dihapus juga gapapa
// export default function AdminStockDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [stockDetail, setStockDetail] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         // Asumsi menggunakan ID log atau ID produk untuk ambil detail
//         const res = await stockService.admin.getAllLog(1, 100);
//         const found = res.data?.data?.find(item => item.id === parseInt(id));
//         setStockDetail(found);
//       } catch (err) {
//         console.error("Gagal mengambil detail:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [id]);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//            <button onClick={() => navigate(-1)} className="hover:text-gray-600">&lt;</button>
//            Detail Stock
//         </h1>
//         <Breadcrumbs items={[
//           { label: "Home", path: "/admin" },
//           { label: "Stock", path: "/admin/stocks" },
//           { label: "Detail Stock", path: "" }
//         ]} />
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-8 space-y-8">
//           {/* Informasi Utama */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Product Name</label>
//                 <p className="text-lg font-medium text-gray-800">{stockDetail?.product_name || "-"}</p>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Varian / SKU</label>
//                 <p className="text-gray-600">{stockDetail?.product_sku || "-"}</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Current Stock</label>
//                 <div className="mt-1">
//                   <span className={`text-2xl font-bold ${stockDetail?.quantity < 5 ? "text-red-500" : "text-emerald-500"}`}>
//                     {stockDetail?.quantity}
//                   </span>
//                   <span className="text-gray-400 ml-2">Units</span>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Last Description</label>
//                 <p className="text-gray-600 italic">"{stockDetail?.description || "No description provided"}"</p>
//               </div>
//             </div>
//           </div>

//           <hr className="border-gray-100" />

//           {/* Info Tambahan (Placeholder) */}
//           <div className="bg-gray-50 p-6 rounded-xl">
//             <h3 className="font-bold text-gray-700 mb-4">Stock Movement Info</h3>
//             <p className="text-sm text-gray-500">
//               This data reflects the latest recorded transaction for this product.
//               To see full history, please check the system logs.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
