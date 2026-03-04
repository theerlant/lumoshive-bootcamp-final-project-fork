import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { HorizontalDivider } from "@/admin/components/Divider";
import { ProductForm } from "./components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { productService } from "@/shared/services/productService";

export const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    console.log(data);

    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (key === "images") {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if (item.file && item.file instanceof File) {
                formData.append("images", item.file);
              }
            });
          }
        } else if (key === "variants") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    }

    try {
      await productService.admin.create(formData);
      // Success feedback: usually we redirect back to the product list
      navigate("/admin/products", { replace: true });
    } catch (err) {
      console.error("Failed to add product:", err);
      setError(err.message || "Something went wrong while adding the product.");
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
      <ProductForm
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
        <h1 className="text-2xl font-bold">Add Product</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "../.." },
            { label: "Product", href: ".." },
            { label: "Add Product" },
          ]}
        />
      </div>
    </section>
  );
};
