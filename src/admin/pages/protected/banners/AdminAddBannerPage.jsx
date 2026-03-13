import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { bannerService } from "@/shared/services/bannerService";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle, LucideUpload } from "lucide-react";
import Button from "../../../components/Button";

const AdminAddBannerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    target_url: "",
    start_date: "",
    end_date: "",
    position: "home",
    image: null // Simpan file asli di sini
  });

  const toRFC3339 = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toISOString();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image");
    
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("image", formData.image);
      data.append("target_url", formData.target_url);
      data.append("title", formData.name); // Sesuai mapping Anda
      data.append("subtitle", "");
      data.append("start_date", toRFC3339(formData.start_date));
      data.append("end_date", toRFC3339(formData.end_date));
      data.append("order", "1");
      data.append("is_published", "true");
      data.append("position", formData.position);

      await bannerService.admin.create(data);
      setShowSuccessModal(true);
      setTimeout(() => navigate("/admin/banners"), 2000);
    } catch (err) {
      alert("Error adding banner: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add Banner</h1>
        <div className="mt-1">
          <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Banner", href: "/admin/banners" }, { label: "Add Banner" }]} />
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Banner Name</label>
              <input type="text" required placeholder="Enter Banner Name" className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#DB4444] outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">End Date</label>
              <input type="date" required className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#DB4444]" value={formData.end_date} onChange={(e) => setFormData({...formData, end_date: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Banner Type</label>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white focus:border-[#DB4444]" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})}>
                <option value="home">Main Banner (Home)</option>
                <option value="category">Category Banner</option>
                <option value="promo">Promo Banner</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Release Date</label>
              <input type="date" required className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#DB4444]" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Target URL</label>
              <input type="text" placeholder="Enter Target URL" className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[#DB4444] outline-none" value={formData.target_url} onChange={(e) => setFormData({...formData, target_url: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Banner Photo</label>
              <div className="border-2 border-dashed border-red-200 rounded-md p-6 text-center bg-red-50 flex flex-col items-center gap-2 cursor-pointer relative overflow-hidden">
                 {preview ? (
                   <img src={preview} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="preview" />
                 ) : null}
                 <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                 <LucideUpload size={24} className="text-red-500" />
                 <span className="text-red-500 text-sm font-medium">
                   {formData.image ? formData.image.name : "Click to upload or drag and drop"}
                 </span>
                 <span className="text-xs text-gray-400">SVG, PNG, JPG (max. 800x400px)</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button variant="outlined" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Banner"}
            </Button>
          </div>
        </form>
      </section>

      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div className="flex flex-col items-center text-center p-8">
          <LucideCheckCircle size={64} className="text-green-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Success!</h2>
          <p className="text-gray-500 mt-2">This banner was successfully added</p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAddBannerPage;