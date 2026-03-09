import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { PromotionForm } from "./components/PromotionForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { promotionService } from "@/shared/services/promotionService";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle } from "lucide-react";

export const AdminAddPromotionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
  setLoading(true);
  setError(null);
  
  try {
    // Fungsi pembantu untuk mengubah tanggal ke format RFC3339 (ISOString)
    const toRFC3339 = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      // Memastikan jam diatur ke 00:00:00 atau sesuai kebutuhan agar valid
      return date.toISOString(); 
    };

    const payload = {
      name: formData.name,
      description: formData.description || null,
      type: formData.type,
      discount_type: formData.discount_type,
      voucher_code: formData.type === "voucher_code" ? formData.voucher_code : null,
      discount_value: Number(formData.discount_value),
      usage_limit: formData.usage_limit ? Number(formData.usage_limit) : null,
      
      start_date: toRFC3339(formData.start_date),
      end_date: toRFC3339(formData.end_date),
      
      product_id: formData.product_id ? Number(formData.product_id) : null,
      is_active: true,
      is_published: true
    };

    console.log("Payload Final ke API:", payload);

    await promotionService.admin.create(payload);
    
    setShowSuccessModal(true);
    setTimeout(() => {
      navigate("/admin/promotions", { replace: true });
    }, 2000);
  } catch (err) {
    const serverMessage = err.response?.data?.message || err.message;
    const details = err.response?.data?.errors;
    
    // Jika ada detail error per field, tampilkan agar kita tahu mana yang kurang
    const fullError = details 
      ? `${serverMessage}: ${JSON.stringify(details)}` 
      : serverMessage;

    setError(fullError);
    console.error("Error dari Server:", err.response?.data);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-6">
      <PageHeader />
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md my-4 text-sm border border-red-100">
          {error}
        </div>
      )}

      <PromotionForm
        onCancel={() => navigate("/admin/promotions")}
        onSubmit={onSubmit}
        loading={loading}
      />

      {/* MODAL SUKSES (GAMBAR 4) */}
      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <LucideCheckCircle size={48} className="text-[#2D9E63]" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Success!</h2>
          <p className="text-gray-500 mt-2">New promotion has been successfully added to the list.</p>
        </div>
      </Modal>
    </div>
  );
};

const PageHeader = () => {
  return (
    <section id="header" className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Add Promotion</h1>
      <div className="mt-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotions" },
            { label: "Add Promotion" },
          ]}
        />
      </div>
    </section>
  );
};