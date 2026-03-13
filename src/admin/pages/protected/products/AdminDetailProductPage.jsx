import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import useSWR from "swr";
import { useEffect } from "react";
import { productService } from "@/shared/services/productService";
import Button from "@/admin/components/Button";
import { IconButton } from "@/admin/components/IconButton";
import { LucidePencil } from "lucide-react";
import { HorizontalDivider } from "@/admin/components/Divider";
import { ProductForm } from "./components/ProductForm";
import { PageLoading, PageError } from "@/admin/components/SimpleConditional";

export const AdminDetailProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(id ? ["/products", id] : null, () =>
    productService.public.getById(id),
  );

  return (
    <>
      <PageHeader />
      <HorizontalDivider />
      {isLoading && (
        <div className="p-6">
          <PageLoading />
        </div>
      )}
      {error && (
        <div className="p-6">
          <PageError error={error} message="Product not found" />
        </div>
      )}
      {!isLoading && !error && data ? (
        <ProductForm initialData={data} readOnly />
      ) : (
        <></>
      )}
      <div className="w-full flex justify-end gap-2">
        <Button variant="outlined" onClick={() => navigate(`/product/${id}`)}>
          View on Public
        </Button>
        <Button variant="secondary" onClick={() => navigate("..")}>
          Back
        </Button>
      </div>
    </>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <section id="header" className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Product Detail</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "../.." },
            { label: "Product", href: ".." },
            { label: "Detail" },
          ]}
        />
      </div>
      <IconButton title="Edit" onClick={() => navigate("./edit")}>
        <LucidePencil />
      </IconButton>
    </section>
  );
};
