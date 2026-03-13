import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

// MASUKKAN DATA DUMMY DI SINI AGAR AMAN DARI ERROR IMPORT
const DUMMY_DATA = [
  {
    id: "1",
    name: "Promo Akhir Tahun",
    target_url: "www.e-commerce.com",
    start_date: "2024-11-09T00:00:00Z",
    end_date: "2024-12-12T00:00:00Z",
    is_published: false,
    image: "https://via.placeholder.com/600x200?text=Promo+Akhir+Tahun",
    position: "home"
  },
  {
    id: "2",
    name: "Produk Baru",
    target_url: "www.e-commerce.com",
    start_date: "2024-11-08T00:00:00Z",
    end_date: "2024-11-11T00:00:00Z",
    is_published: true,
    image: "https://via.placeholder.com/600x200?text=Produk+Baru",
    position: "home"
  },
  {
    id: "3",
    name: "Diskon 30%",
    target_url: "www.e-commerce.com",
    start_date: "2024-11-07T00:00:00Z",
    end_date: "2024-11-10T00:00:00Z",
    is_published: false,
    image: "https://via.placeholder.com/600x200?text=Diskon+30",
    position: "home"
  }
];

const AdminDetailBannerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cari data berdasarkan ID dari URL
    // Gunakan == agar jika satu string dan satu number tetap cocok
    const found = DUMMY_DATA.find(b => b.id == id);
    
    if (found) {
        setData(found);
    } else {
        // Jika tidak ketemu (misal id ngaco), pakai data pertama sebagai fallback
        setData(DUMMY_DATA[0]);
    }
  }, [id]);

  // Jika data masih null, tampilkan pesan loading yang jelas
  if (!data) return (
    <div className="p-6 text-center font-bold text-gray-500">
      Loading Data Dummy (ID: {id})...
    </div>
  );

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Detail Banner</h1>
        <Breadcrumbs items={[
            { label: "Home", href: "/admin" }, 
            { label: "Banner", href: "/admin/banners" }, 
            { label: "Detail" }
        ]} />
      </section>

      <section className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 w-full">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Banner Name</label>
            <input readOnly value={data.name || ""} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Release Date</label>
            <input readOnly value={data.start_date?.split("T")[0] || ""} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">End Date</label>
            <input readOnly value={data.end_date?.split("T")[0] || ""} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Target URL</label>
            <input readOnly value={data.target_url || "-"} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Banner Type</label>
            <input readOnly value={data.position === 'home' ? "Main Banner (Home)" : "Category Banner"} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-semibold text-gray-700">Banner Photo</label>
            <div className="border border-gray-200 rounded-lg p-2 bg-[#F3F4F6] w-fit">
              <img src={data.image} alt="preview" className="h-20 w-32 object-cover rounded border bg-white" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-12">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="px-10 py-2.5 rounded-lg bg-[#8E8E93] text-white font-medium text-sm hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDetailBannerPage;