import { useEffect } from "react";
import { InputField, InputLabel } from "@/admin/components/InputField";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { productService } from "../../../../../shared/services/productService";

export const PromotionForm = ({
  initialData = {},
  readOnly = false,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  // Ambil data produk untuk dropdown "Product"
  const { data: productData } = useSWR("/products", () =>
    productService.public.getAll({ limit: 100 })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      type: initialData?.type || "",
      product_id: initialData?.product_id || "",
      end_date: initialData?.end_date ? initialData.end_date.split("T")[0] : "",
      usage_limit: initialData?.usage_limit || "",
      name: initialData?.name || "",
      start_date: initialData?.start_date ? initialData.start_date.split("T")[0] : "",
      discount_value: initialData?.discount_value || "",
      description: initialData?.description || "",
    }
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setValue("type", initialData.type || "");
      setValue("product_id", initialData.product_id || "");
      setValue("end_date", initialData.end_date ? initialData.end_date.split("T")[0] : "");
      setValue("usage_limit", initialData.usage_limit || "");
      setValue("name", initialData.name || "");
      setValue("start_date", initialData.start_date ? initialData.start_date.split("T")[0] : "");
      setValue("discount_value", initialData.discount_value || "");
      setValue("description", initialData.description || "");
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 mt-4">
      {/* Kiri */}
      <div className="flex flex-col gap-4">
        <div className="text-base">
          <InputLabel htmlFor="type" text="Promotion Type" />
          {readOnly ? (
            <InputField id="type" readOnly={readOnly} defaultValue={initialData.type || ""} />
          ) : (
            <select
              className="w-full px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] focus:outline-1 outline-gray-200 rounded-lg"
              id="type"
              {...register("type", { required: "Type is required" })}
            >
              <option value="" disabled>Select Promotion Type</option>
              <option value="direct_discount">Direct Discount</option>
              <option value="voucher_code">Voucher Code</option>
            </select>
          )}
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>

        <div className="text-base">
          <InputLabel htmlFor="product_id" text="Product" />
          {readOnly ? (
            <InputField id="product_id" readOnly={readOnly} defaultValue={initialData.product?.name || "All Products"} />
          ) : (
            <select
              className="w-full px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] focus:outline-1 outline-gray-200 rounded-lg"
              id="product_id"
              {...register("product_id")}
            >
              <option value="">All Products</option>
              {productData?.data?.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="text-base">
          <InputLabel htmlFor="end_date" text="End Date" />
          <InputField
            id="end_date"
            type="date"
            readOnly={readOnly}
            {...register("end_date", { required: "End Date is required" })}
          />
          {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date.message}</p>}
        </div>

        <div className="text-base">
          <InputLabel htmlFor="usage_limit" text="Promotion Usage limit" />
          <InputField
            id="usage_limit"
            type="number"
            placeholder="Enter Usage Limit"
            readOnly={readOnly}
            {...register("usage_limit", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Kanan */}
      <div className="flex flex-col gap-4">
        <div className="text-base">
          <InputLabel htmlFor="name" text="Promotion Name" />
          <InputField
            id="name"
            placeholder="Enter Promotion Name"
            readOnly={readOnly}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="text-base">
          <InputLabel htmlFor="start_date" text="Start Date" />
          <InputField
            id="start_date"
            type="date"
            readOnly={readOnly}
            {...register("start_date", { required: "Start Date is required" })}
          />
          {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
        </div>

        <div className="text-base">
          <InputLabel htmlFor="discount_value" text="Discount Value" />
          <InputField
            id="discount_value"
            type="number"
            placeholder="Enter Discount Amount / Percentage"
            readOnly={readOnly}
            {...register("discount_value", { required: "Discount is required", valueAsNumber: true })}
          />
          {errors.discount_value && <p className="text-red-500 text-xs mt-1">{errors.discount_value.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="text-base col-span-2">
        <InputLabel htmlFor="description" text="Description" />
        <textarea
          id="description"
          maxLength={1000}
          className="w-full min-h-20 max-h-60 p-2 py-1 text-sm rounded-sm bg-[#F4F5F9] outline-1 outline-[#DBDCDE] text-[#030406] focus:outline-none"
          readOnly={readOnly}
          {...register("description")}
        />
      </div>

      {/* Action Buttons */}
      {!readOnly ? (
        <div className="w-full col-span-2 flex justify-end gap-2 mt-4">
          <Button variant="outlined" type="button" onClick={() => onCancel()} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : (initialData?.id ? "Save Changes" : "Add Promotion")}
          </Button>
        </div>
      ) : null}
    </form>
  );
};