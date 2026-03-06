import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { HorizontalDivider } from "@/admin/components/Divider";
import { PromotionForm } from "./components/PromotionForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { promotionService } from "@/shared/services/promotionService";

export const AdminAddPromotionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Karena promo biasanya tidak perlu multipart formData (gambar), kita kirim raw JSON
      await promotionService.admin.create(data);
      navigate("/admin/promotion", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong while adding the promotion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />
      <HorizontalDivider />
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg my-4 text-sm border border-red-100">
          {error}
        </div>
      )}
      <PromotionForm
        onCancel={() => navigate("..")}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  );
};

const PageHeader = () => {
  return (
    <section id="header" className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Add Promotion</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotion" },
            { label: "Add Promotion" },
          ]}
        />
      </div>
    </section>
  );
};