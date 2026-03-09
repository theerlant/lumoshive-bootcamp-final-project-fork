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
  const { data: productData } = useSWR("/products", () =>
    productService.public.getAll({ limit: 100 })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      voucher_code: initialData?.voucher_code || "",
    }
  });

  const promotionType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full">
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        
        {/* KOLOM KIRI */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="type" text="Promotion Type" className="font-semibold text-gray-700" />
            <select
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#DB4444] transition-colors"
              id="type"
              {...register("type", { required: "Please select a promotion type" })}
            >
              <option value="">Select Promotion Type</option>
              <option value="direct_discount">Direct Discount</option>
              <option value="voucher_code">Voucher Code</option>
            </select>
            {errors.type && <p className="text-[#DB4444] text-xs font-medium">{errors.type.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="discount_type" text="Discount Type" className="font-semibold text-gray-700" />
            <select
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#DB4444]"
              id="discount_type"
              {...register("discount_type", { required: "Discount type is required" })}
            >
              <option value="">Select Discount Type</option>
              <option value="fixed">Fixed (Rp)</option>
              <option value="percentage">Percentage (%)</option>
            </select>
            {errors.discount_type && <p className="text-[#DB4444] text-xs font-medium">{errors.discount_type.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="discount_value" text="Discount Value" className="font-semibold text-gray-700" />
            <div className="relative">
              <InputField
                id="discount_value"
                type="number"
                placeholder="0"
                {...register("discount_value", { 
                  required: "Discount value is required", 
                  valueAsNumber: true 
                })}
              />
              {/* Logic sederhana untuk menampilkan satuan secara dinamis */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                {watch("discount_type") === "percentage" ? "%" : "Rp"}
              </span>
            </div>
          </div>

          {promotionType === "voucher_code" && (
            <div className="flex flex-col gap-2">
              <InputLabel htmlFor="voucher_code" text="Voucher Code" className="font-semibold text-gray-700" />
              <InputField
                id="voucher_code"
                placeholder="Ex: PROMO2024"
                {...register("voucher_code", { required: "Voucher code is required" })}
              />
              {errors.voucher_code && <p className="text-[#DB4444] text-xs font-medium">{errors.voucher_code.message}</p>}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="product_id" text="Product Items" className="font-semibold text-gray-700" />
            <select
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#DB4444]"
              id="product_id"
              {...register("product_id")}
            >
              <option value="">All Products</option>
              {productData?.data?.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="start_date" text="Start Date" className="font-semibold text-gray-700" />
            <InputField
              id="start_date"
              type="date"
              {...register("start_date", { required: "Start Date is required" })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="end_date" text="End Date" className="font-semibold text-gray-700" />
            <InputField
              id="end_date"
              type="date"
              {...register("end_date", { required: "End Date is required" })}
            />
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="name" text="Promotion Name" className="font-semibold text-gray-700" />
            <InputField
              id="name"
              placeholder="Enter Promotion Name"
              {...register("name", { required: "Promotion name is required" })}
            />
            {errors.name && <p className="text-[#DB4444] text-xs font-medium">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="usage_limit" text="Promotion Usage Limit" className="font-semibold text-gray-700" />
            <InputField
              id="usage_limit"
              type="number"
              placeholder="Ex: 100"
              // MENGGUNAKAN valueAsNumber
              {...register("usage_limit", { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel htmlFor="description" text="Description (Optional)" className="font-semibold text-gray-700" />
            <textarea
              id="description"
              placeholder="Enter promotion details..."
              className="w-full min-h-[125px] p-4 text-sm rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#DB4444] transition-all"
              {...register("description")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-12 pt-6 border-t border-gray-100">
        <Button
          variant="outlined"
          type="button"
          onClick={() => onCancel()}
          disabled={loading}
          >
          Cancel
          </Button>
          <Button type="submit" disabled={loading}>
           {loading ? "Adding..." : "Add Promotion"}
          </Button>
      </div>
    </form>
  );
};