import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bannerService } from "@/shared/services/bannerService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle } from "lucide-react";

const AdminEditBannerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    target_url: "",
    start_date: "",
    end_date: "",
    position: "home",
    image: null, // Berisi File object jika user ganti gambar
    is_published: true,
    order: 1
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await bannerService.admin.getById(id);
        const d = res.data;
        setFormData({
          name: d.name || "",
          target_url: d.target_url || "",
          start_date: d.start_date ? d.start_date.split("T")[0] : "",
          end_date: d.end_date ? d.end_date.split("T")[0] : "",
          position: d.position || "home",
          image: null, 
          is_published: d.is_published,
          order: d.order
        });
        setPreview(d.image);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      // Hanya kirim field image jika user memilih file baru
      if (formData.image) {
        data.append("image", formData.image);
      }
      data.append("target_url", formData.target_url);
      data.append("title", formData.name);
      data.append("subtitle", "");
      data.append("start_date", new Date(formData.start_date).toISOString());
      data.append("end_date", new Date(formData.end_date).toISOString());
      data.append("order", String(formData.order));
      data.append("is_published", String(formData.is_published));
      data.append("position", formData.position);

      await bannerService.admin.update(id, data);
      setShowSuccessModal(true);
      setTimeout(() => navigate("/admin/banners"), 2000);
    } catch (err) {
      alert("Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Banner</h1>
        <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Banner", href: "/admin/banners" }, { label: "Edit Banner" }]} />
      </section>

      <section className="bg-white p-8 rounded-lg border border-gray-100 max-w-5xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Name</label>
              <input type="text" className="border rounded-md px-3 py-2 text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">End Date</label>
              <input type="date" className="border rounded-md px-3 py-2 text-sm" value={formData.end_date} onChange={(e) => setFormData({...formData, end_date: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Type</label>
              <select className="border rounded-md px-3 py-2 text-sm bg-white" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})}>
                <option value="home">Main Banner (Home)</option>
                <option value="category">Category Banner</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Release Date</label>
              <input type="date" className="border rounded-md px-3 py-2 text-sm" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Target URL</label>
              <input type="text" className="border rounded-md px-3 py-2 text-sm" value={formData.target_url} onChange={(e) => setFormData({...formData, target_url: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Photo</label>
              <div className="border border-gray-200 rounded p-2 flex gap-4 items-center">
                 <img src={preview} className="w-20 h-12 object-cover rounded" />
                 <input type="file" className="text-xs" onChange={(e) => {
                   const file = e.target.files[0];
                   setFormData({...formData, image: file});
                   setPreview(URL.createObjectURL(file));
                 }} />
              </div>
            </div>
          </div>
          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button variant="outlined" type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </div>
        </form>
      </section>

      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div className="flex flex-col items-center p-8">
          <LucideCheckCircle size={64} className="text-green-500 mb-4" />
          <h2 className="text-xl font-bold">This banner was successfully updated</h2>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEditBannerPage;