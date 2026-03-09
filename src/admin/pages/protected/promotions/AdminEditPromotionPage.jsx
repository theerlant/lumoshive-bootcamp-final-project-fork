import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle, LucideChevronLeft } from "lucide-react";

const toRFC3339 = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString(); 
};

export const AdminEditPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "direct_discount",
    voucher_code: "",
    start_date: "",
    end_date: "",
    discount_value: "",
    usage_limit: "",
    description: "",
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await promotionService.admin.getById(id);
        const data = res.data;
        // Memastikan data lama (name, dll) masuk ke state agar tidak kosong
        setFormData({
          name: data.name || "",
          type: data.type || "direct_discount",
          voucher_code: data.voucher_code || "",
          start_date: data.start_date ? data.start_date.split("T")[0] : "",
          end_date: data.end_date ? data.end_date.split("T")[0] : "",
          discount_value: data.discount_value || "",
          usage_limit: data.usage_limit || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error("Failed to fetch promotion detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
    ...formData,
    discount_value: parseFloat(formData.discount_value) || 0,
    usage_limit: parseInt(formData.usage_limit) || 0,
    start_date: toRFC3339(formData.start_date),
    end_date: toRFC3339(formData.end_date),
  };
    try {
    await promotionService.admin.update(id, payload);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/admin/promotions");
    }, 2000);
  } catch (err) {
    // Menampilkan pesan error detail dari response backend
    const errorMessage = err.response?.data?.errors?.error || "Failed to update promotion";
    alert(`Error: ${errorMessage}`);
    console.error("Submit Error:", err.response?.data);
  }
};

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <PageHeader />
      <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          
          {/* Row 1 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Promotion Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] bg-white text-sm"
            >
              <option value="direct_discount">Direct Discount</option>
              <option value="voucher_code">Voucher Code</option>
            </select>
          </div>

          {formData.type === "voucher_code" ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Voucher Code</label>
              <input
                type="text"
                value={formData.voucher_code}
                placeholder="Ex: MERDEKA1"
                onChange={(e) => setFormData({ ...formData, voucher_code: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Promotion Name</label>
              <input
                type="text"
                value={formData.name}
                placeholder="Enter Promotion Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
              />
            </div>
          )}

          {/* Row 2 */}
          {formData.type === "voucher_code" && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Promotion Name</label>
              <input
                type="text"
                value={formData.name}
                placeholder="Enter Promotion Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Start Date</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
            />
          </div>

          {/* Row 3 - Penyesuaian tata letak sesuai Gambar 1 & 2 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">End Date</label>
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Discount</label>
            <div className="relative">
               <input
                type="number"
                value={formData.discount_value}
                placeholder="Amount : 50.000"
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Promotion Usage Limit</label>
            <input
              type="number"
              value={formData.usage_limit}
              placeholder="20"
              onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#DB4444] text-sm"
            />
          </div>

          {formData.type === "voucher_code" && (
             <div className="flex items-center gap-2 mt-auto pb-3">
                <input type="checkbox" className="w-4 h-4 accent-[#DB4444]" id="show-code" />
                <label htmlFor="show-code" className="text-xs text-gray-500">Show the voucher code on the checkout page</label>
             </div>
          )}

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <Button
            variant="outlined"
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            >
            Cancel
            </Button>
            <Button type="submit" disabled={loading}>
             {loading ? "Editing..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </section>

      {/* Success Modal - Gambar 3 */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <LucideCheckCircle size={64} className="text-green-500" />
          <h2 className="text-xl font-bold">This promotion was successfully updated</h2>
        </div>
      </Modal>
    </div>
  );
};

const PageHeader = () => {
  return (
    <section id="header" className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Edit Promotion</h1>
      <div className="mt-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotions" },
            { label: "Edit Promotion" },
          ]}
        />
      </div>
    </section>
  );
};