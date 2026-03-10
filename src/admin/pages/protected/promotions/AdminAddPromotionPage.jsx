import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { PromotionForm } from "./components/PromotionForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { promotionService } from "@/shared/services/promotionService";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle } from "lucide-react";
import { toBackendDate } from "@/shared/utils/toBackendDate";

export const AdminAddPromotionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description || null,
        type: "direct_discount", // Keep a default type since backend might expect it, or remove if truly gone. Assuming we only have direct_discount now based on the payload.
        discount_type: formData.discount_type,
        discount_value: Number(formData.discount_value),
        min_purchase: Number(formData.min_purchase),
        max_discount: Number(formData.max_discount),

        start_date: formData.start_date
          ? toBackendDate(new Date(formData.start_date))
          : null,
        end_date: formData.end_date
          ? toBackendDate(new Date(formData.end_date))
          : null,
        is_active: true,
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
          <p className="text-gray-500 mt-2">
            New promotion has been successfully added to the list.
          </p>
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
