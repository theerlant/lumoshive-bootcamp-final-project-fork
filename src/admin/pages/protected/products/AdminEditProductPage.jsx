import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { HorizontalDivider } from "@/admin/components/Divider";
import { ProductForm } from "./components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { productService } from "@/shared/services/productService";

export const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  const { data, error, isLoading } = useSWR(id ? ["/products", id] : null, () =>
    productService.public.getById(id),
  );

  const { mutate } = useSWRConfig();

  const handleDeleteImage = (imageId) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
  };

  const onSubmit = async (formDataState) => {
    setLoading(true);
    setErrorText(null);

    try {
      // 1. Update product details (PUT)
      const dataPayload = new FormData();
      dataPayload.append("name", formDataState.name);
      dataPayload.append("sku", formDataState.sku);
      if (formDataState.category_id) {
        dataPayload.append("category_id", formDataState.category_id);
      }
      dataPayload.append("description", formDataState.description);
      dataPayload.append("price", formDataState.price);
      dataPayload.append("stock", formDataState.stock);
      dataPayload.append(
        "variants",
        JSON.stringify(formDataState.variants || {}),
      );

      // Preserve existing boolean flags if they aren't in the form
      const isPublished =
        formDataState.is_published !== undefined
          ? formDataState.is_published
          : data?.is_published;
      if (isPublished !== undefined)
        dataPayload.append("is_published", isPublished);

      const isNew =
        formDataState.is_new !== undefined
          ? formDataState.is_new
          : data?.is_new;
      if (isNew !== undefined) dataPayload.append("is_new", isNew);

      await productService.admin.update(id, dataPayload);

      // 2. Upload new images if any (POST)
      if (formDataState.images && formDataState.images.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("product_id", id);
        formDataState.images.forEach((item) => {
          if (item.file && item.file instanceof File) {
            imageFormData.append("images", item.file);
          }
        });

        // Check if there are actually files to upload
        if (imageFormData.getAll("images").length > 0) {
          await productService.admin.uploadImages(id, imageFormData);
        }
      }

      // 3. Delete requested images (DELETE)
      if (deletedImageIds.length > 0) {
        for (const imageId of deletedImageIds) {
          await productService.admin.deleteImage(imageId);
        }
      }

      // Mutate SWR cache related to products
      mutate((key) => Array.isArray(key) && key.includes(targetUrl), {
        revalidate: true,
      });

      navigate("/admin/products", { replace: true });
    } catch (err) {
      console.error("Failed to update product:", err);
      setErrorText(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while updating the product.",
      );
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
          {errorText || "Failed to load product."}
        </div>
      )}

      {isLoading && <div className="p-4 text-center">Loading...</div>}

      {!isLoading && data && (
        <ProductForm
          initialData={data}
          onCancel={() => navigate("..")}
          onSubmit={onSubmit}
          loading={loading}
          onDeleteImage={handleDeleteImage}
        />
      )}
    </>
  );
};

const PageHeader = () => {
  return (
    <section id="header" className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "../.." },
            { label: "Product", href: ".." },
            { label: "Edit Product" },
          ]}
        />
      </div>
    </section>
  );
};
