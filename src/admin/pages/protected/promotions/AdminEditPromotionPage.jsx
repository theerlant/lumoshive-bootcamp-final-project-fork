import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { Modal } from "@/admin/components/Modal";
import { LucideCheckCircle } from "lucide-react";
import { toBackendDate } from "@/shared/utils/toBackendDate";
import { PromotionForm } from "./components/PromotionForm";
import { PageLoading } from "@/admin/components/SimpleConditional";

export const AdminEditPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    min_purchase: "",
    max_discount: "",
    start_date: "",
    end_date: "",
  });

  const [errorText, setErrorText] = useState(null);
  const [internalId, setInternalId] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await promotionService.admin.getByCode(id);
        const data = res?.data || res;
        if (data.id) setInternalId(data.id);

        // Memastikan data lama (name, dll) masuk ke state agar tidak kosong
        setFormData({
          name: data.name || "",
          description: data.description || "",
          discount_type: data.discount_type || "percentage",
          discount_value: data.discount_value || "",
          min_purchase: data.min_purchase || "",
          max_discount: data.max_discount || "",
          start_date: data.start_date ? data.start_date.split("T")[0] : "",
          end_date: data.end_date ? data.end_date.split("T")[0] : "",
          is_active: data.is_active ?? true,
        });
      } catch (err) {
        console.error("Failed to fetch promotion detail:", err);
        setErrorText("Failed to load promotion details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    setErrorText(null);
    const payload = {
      name: data.name,
      description: data.description || null,
      type: "direct_discount", // fallback if required
      discount_type: data.discount_type,
      discount_value: parseFloat(data.discount_value) || 0,
      min_purchase: parseFloat(data.min_purchase) || 0,
      max_discount: parseFloat(data.max_discount) || 0,
      start_date: data.start_date
        ? toBackendDate(new Date(data.start_date))
        : null,
      end_date: data.end_date ? toBackendDate(new Date(data.end_date)) : null,
      is_active: data.is_active,
    };
    try {
      const updateId = internalId || id;
      await promotionService.admin.update(updateId, payload);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/admin/promotions");
      }, 2000);
    } catch (err) {
      console.error("Failed to update promotion:", err);
      let errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to update promotion.";
      if (err.serverErrors && typeof err.serverErrors === "object") {
        const validationErrors = Object.values(err.serverErrors)
          .flat()
          .join(", ");
        if (validationErrors) {
          errorMsg += " " + validationErrors;
        }
      }
      setErrorText(errorMsg);
    } finally {
      if (!showSuccessModal) setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-6">
        <PageLoading />
      </div>
    );

  return (
    <div className="p-6">
      <PageHeader />

      {errorText && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg my-4 text-sm border border-red-100">
          {errorText}
        </div>
      )}

      {/* Replaced hardcoded form with PromotionForm */}
      <PromotionForm
        initialData={formData}
        isEdit={true}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />

      {/* Success Modal - Gambar 3 */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <LucideCheckCircle size={64} className="text-green-500" />
          <h2 className="text-xl font-bold">
            This promotion was successfully updated
          </h2>
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
