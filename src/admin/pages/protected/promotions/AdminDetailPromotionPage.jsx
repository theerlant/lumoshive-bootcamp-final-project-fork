import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import useSWR from "swr";
import { promotionService } from "@/shared/services/promotionService";
import Button from "@/admin/components/Button";
import { IconButton } from "@/admin/components/IconButton";
import { LucidePencil } from "lucide-react";
import { HorizontalDivider } from "@/admin/components/Divider";
import { PromotionForm } from "./components/PromotionForm";

export const AdminDetailPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(id ? [`/admin/promotion`, id] : null, () =>
    promotionService.admin.getById(id),
  );

  return (
    <>
      <PageHeader id={id} />
      <HorizontalDivider />
      {!isLoading && data?.data ? <PromotionForm initialData={data.data} readOnly /> : null}
      <div className="w-full flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={() => navigate("..")}>
          Back
        </Button>
      </div>
    </>
  );
};

const PageHeader = ({ id }) => {
  const navigate = useNavigate();
  return (
    <section id="header" className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Promotion Detail</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotion" },
            { label: "Detail" },
          ]}
        />
      </div>
      <IconButton title="Edit" onClick={() => navigate(`../edit/${id}`)}>
        <LucidePencil />
      </IconButton>
    </section>
  );
};