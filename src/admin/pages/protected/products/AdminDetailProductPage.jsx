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

export const AdminDetailProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  console.log(id);

  const { data, error, isLoading } = useSWR(id ? ["/products", id] : null, () =>
    productService.public.getById(id),
  );

  useEffect(() => {
    if (data) {
      console.log(data);

      console.log(data.variants);
    }
  }, [data]);

  return (
    <>
      <PageHeader />
      <HorizontalDivider />
      {!isLoading && data ? <ProductForm initialData={data} readOnly /> : <></>}
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
