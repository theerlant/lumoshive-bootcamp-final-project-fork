import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bannerService } from "@/shared/services/bannerService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

const AdminDetailBannerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    bannerService.admin.getById(id).then(res => setData(res.data));
  }, [id]);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold">Detail Banner</h1>
        <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Banner", href: "/admin/banners" }, { label: "Detail" }]} />
      </section>

      <section className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 max-w-5xl">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Banner Name</label>
            <input readOnly value={data.name} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Release Date</label>
            <input readOnly value={data.start_date?.split("T")[0]} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">End Date</label>
            <input readOnly value={data.end_date?.split("T")[0]} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Target URL</label>
            <input readOnly value={data.target_url || "-"} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Banner Type</label>
            <input readOnly value={data.position === 'home' ? "Main Banner (Home)" : "Category Banner"} className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Banner Photo</label>
            <div className="border border-gray-200 rounded-lg p-2 bg-[#F3F4F6]">
              <img src={data.image} className="h-20 w-32 object-cover rounded border" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-12">
          <button onClick={() => navigate(-1)} className="px-10 py-2.5 rounded-lg bg-[#8E8E93] text-white font-medium text-sm hover:bg-gray-500">Close</button>
        </div>
      </section>
    </div>
  );
};

export default AdminDetailBannerPage;