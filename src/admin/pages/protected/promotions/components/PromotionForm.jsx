import { useEffect } from "react";
import { InputField, InputLabel } from "@/admin/components/InputField";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promotionSchema } from "@/shared/schema/promotionSchema";
export const PromotionForm = ({
  initialData = {},
  readOnly = false,
  isEdit = false,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      discount_type: initialData?.discount_type || "",
      discount_value: initialData?.discount_value || "",
      min_purchase: initialData?.min_purchase || "",
      max_discount: initialData?.max_discount || "",
      start_date: initialData?.start_date
        ? initialData.start_date.split("T")[0]
        : "",
      end_date: initialData?.end_date ? initialData.end_date.split("T")[0] : "",
      is_active: initialData?.is_active ?? true,
    },
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        discount_type: initialData.discount_type || "",
        discount_value: initialData.discount_value || "",
        min_purchase: initialData.min_purchase || "",
        max_discount: initialData.max_discount || "",
        start_date: initialData.start_date
          ? initialData.start_date.split("T")[0]
          : "",
        end_date: initialData.end_date
          ? initialData.end_date.split("T")[0]
          : "",
        is_active: initialData.is_active ?? true,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="discount_type"
            text="Discount Type"
            className="font-semibold text-gray-700"
          />
          <select
            className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#DB4444]"
            id="discount_type"
            {...register("discount_type", {
              required: "Discount type is required",
            })}
          >
            <option value="">Select Discount Type</option>
            <option value="fixed">Fixed (Rp)</option>
            <option value="percentage">Percentage (%)</option>
          </select>
          {errors.discount_type && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.discount_type.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="name"
            text="Promotion Name"
            className="font-semibold text-gray-700"
          />
          <InputField
            id="name"
            placeholder="Enter Promotion Name (e.g., SUMMER10)"
            {...register("name", { required: "Promotion name is required" })}
          />
          {errors.name && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="start_date"
            text="Start Date"
            className="font-semibold text-gray-700"
          />
          <InputField id="start_date" type="date" {...register("start_date")} />
          {errors.start_date && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="end_date"
            text="End Date"
            className="font-semibold text-gray-700"
          />
          <InputField id="end_date" type="date" {...register("end_date")} />
          {errors.end_date && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.end_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="discount_value"
            text="Discount Value"
            className="font-semibold text-gray-700"
          />
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-sm font-medium">
              {watch("discount_type") === "percentage" ? "%" : "Rp"}
            </span>
            <div className="flex-1">
              <InputField
                id="discount_value"
                type="number"
                placeholder="0"
                {...register("discount_value", {
                  required: "Discount value is required",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          {errors.discount_value && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.discount_value.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="min_purchase"
            text="Minimum Purchase"
            className="font-semibold text-gray-700"
          />
          <div className="flex w-full items-center gap-2">
            <span className="text-gray-400 text-sm font-medium">Rp</span>
            <div className="flex-1">
              <InputField
                id="min_purchase"
                type="number"
                placeholder="0"
                {...register("min_purchase", {
                  required: "Minimum purchase is required",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          {errors.min_purchase && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.min_purchase.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="max_discount"
            text="Maximum Discount"
            className="font-semibold text-gray-700"
          />
          <div className="flex gap-2 items-center">
            <span className=" text-gray-400 text-sm font-medium">Rp</span>
            <div className="flex-1">
              <InputField
                id="max_discount"
                type="number"
                placeholder="0"
                {...register("max_discount", {
                  required: "Maximum discount is required",
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          {errors.max_discount && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.max_discount.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel
            htmlFor="description"
            text="Description (Optional)"
            className="font-semibold text-gray-700"
          />
          <textarea
            id="description"
            placeholder="Enter promotion details..."
            className="w-full min-h-[125px] p-4 text-sm rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#DB4444] transition-all"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-[#DB4444] text-xs font-medium">
              {errors.description.message}
            </p>
          )}
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
          {loading
            ? isEdit
              ? "Saving..."
              : "Adding..."
            : isEdit
              ? "Save Changes"
              : "Add Promotion"}
        </Button>
      </div>
    </form>
  );
};
