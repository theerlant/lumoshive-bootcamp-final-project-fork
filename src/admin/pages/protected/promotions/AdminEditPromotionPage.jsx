import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { HorizontalDivider } from "@/admin/components/Divider";
import { PromotionForm } from "./components/PromotionForm";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { promotionService } from "@/shared/services/promotionService";

export const AdminEditPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const { data, error, isLoading } = useSWR(id ? [`/admin/promotion`, id] : null, () =>
    promotionService.admin.getById(id),
  );
  
  const { mutate } = useSWRConfig();

  const onSubmit = async (formDataState) => {
    setLoading(true);
    setErrorText(null);
    try {
      await promotionService.admin.update(id, formDataState);
      
      // Mutate SWR list
      mutate((key) => Array.isArray(key) && key.includes("/admin/promotion"), { revalidate: true });
      navigate("/admin/promotion", { replace: true });
    } catch (err) {
      setErrorText(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />
      <HorizontalDivider />
      {(errorText || error) && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg my-4 text-sm border border-red-100">
          {errorText || "Failed to load promotion."}
        </div>
      )}

      {isLoading && <div className="p-4 text-center">Loading...</div>}

      {!isLoading && data?.data && (
        <PromotionForm
          initialData={data.data}
          onCancel={() => navigate("..")}
          onSubmit={onSubmit}
          loading={loading}
        />
      )}
    </>
  );
};

const PageHeader = () => {
  return (
    <section id="header" className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Edit Promotion</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotion" },
            { label: "Edit Promotion" },
          ]}
        />
      </div>
    </section>
  );
};