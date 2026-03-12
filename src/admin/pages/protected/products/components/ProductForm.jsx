import { Fragment, useEffect, useState } from "react";
import { InputField, InputLabel } from "@/admin/components/InputField";
import { toTitleCase } from "@/shared/utils/toTitleCase";
import { VariantChip } from "@/admin/components/VariantChip";
import Button from "../../../../components/Button";
import { LucidePlusCircle, LucideX } from "lucide-react";
import { IconButton } from "../../../../components/IconButton";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../../../shared/schema/productSchema";
import { categoryService } from "../../../../../shared/services/categoryService";
import useSWR from "swr";

export const ProductForm = ({
  initialData = {},
  readOnly = false,
  onSubmit,
  onCancel,
  loading = false,
  onDeleteImage = () => {},
}) => {
  const [variants, setVariants] = useState({
    colors: ["Black", "White"],
  });

  const [newVarCat, setNewVarCat] = useState("");
  const [newVarName, setNewVarName] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (initialData.images) {
      setExistingImages(Array.from(initialData.images));
    }
  }, [initialData.images]);

  const handleRemoveExistingImage = (imageId) => {
    if (!imageId) return;
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    onDeleteImage(imageId);
  };

  const addVariant = () => {
    if (!newVarCat || !newVarName) return;

    const lowerCaseCat = newVarCat.toLowerCase();

    setVariants((prev) => {
      const existingCategoryArray = prev[lowerCaseCat] || [];

      if (existingCategoryArray.includes(newVarName)) return prev;

      return {
        ...prev,
        [lowerCaseCat]: [...existingCategoryArray, newVarName],
      };
    });

    // Clear inputs
    setNewVarCat("");
    setNewVarName("");
  };

  const removeVariant = (category, name) => {
    if (!category || !name || !variants[category]) return;

    setVariants((prevVariants) => {
      if (!prevVariants[category].includes(name)) return prevVariants;

      const filtered = prevVariants[category].filter((v) => v !== name);
      const newVariants = { ...prevVariants };

      if (filtered.length === 0) {
        delete newVariants[category];
      } else {
        newVariants[category] = filtered;
      }

      return newVariants;
    });
  };

  const { data, error } = useSWR("/categories", () =>
    categoryService.public.getAll({ limit: 100 }),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => append({ file }));
    }
    e.target.value = "";
  };

  useEffect(() => {
    setValue("variants", variants, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }, [variants]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 mt-4"
    >
      <div className="text-base">
        <InputLabel htmlFor="name" text="Name" />
        <InputField
          id="name"
          readOnly={readOnly}
          defaultValue={initialData.name || ""}
          maxLength={255}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="text-base">
        <InputLabel htmlFor="category_id" text="Product Category" />
        {readOnly ? (
          <InputField
            id="category_id"
            readOnly={readOnly}
            defaultValue={initialData.category?.id || ""}
          />
        ) : (
          <select
            className="w-full px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] focus:outline-1 outline-gray-200 rounded-lg"
            id="category_id"
            {...register("category_id")}
          >
            <option value="" disabled>
              Select a Category
            </option>
            {data?.data?.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        )}
        {errors.category_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.category_id.message}
          </p>
        )}
      </div>
      <div className="text-base col-span-2">
        <InputLabel htmlFor="sku" text="SKU" />
        <InputField
          id="sku"
          readOnly={readOnly}
          defaultValue={initialData.sku || ""}
          {...register("sku")}
        />
        {errors.sku && (
          <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>
        )}
      </div>
      <div className="text-base">
        <InputLabel htmlFor="stock" text="Stock" />
        <InputField
          id="stock"
          type="number"
          readOnly={readOnly}
          defaultValue={initialData.stock || 0}
          {...register("stock", { valueAsNumber: true })}
        />
        {errors.stock && (
          <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
        )}
      </div>
      <div className="text-base">
        <InputLabel htmlFor="price" text="Price" />
        <InputField
          id="price"
          type={readOnly ? "text" : "number"}
          readOnly={readOnly}
          defaultValue={
            readOnly && initialData.price
              ? initialData.price
              : initialData.price || 0
          }
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>
      <div className="text-base col-span-2">
        <InputLabel text={"Variants"} />
        {readOnly ? (
          initialData.variants && Object.keys(initialData.variants).length ? (
            <div className="flex flex-col gap-1">
              {Object.keys(initialData.variants).map((key) => (
                <Fragment key={key}>
                  <h3 className="mt-2 text-sm">{toTitleCase(key)}</h3>
                  <div className="flex gap-2 text-sm">
                    {Array.from(initialData.variants[key]).map((val) => (
                      <VariantChip key={val}>{val}</VariantChip>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          ) : (
            <InputField readOnly value="No Variant" />
          )
        ) : (
          <>
            {Object.keys(variants).map((key) => {
              return Array.from(variants[key]).length === 0 ? null : (
                <div key={key} className="flex items-center mb-2">
                  <h3 className="text-sm mr-4">{toTitleCase(key)}</h3>
                  <div className="flex gap-2 text-sm">
                    {Array.from(variants[key]).map((val) => (
                      <VariantChip key={val}>
                        <div className="flex items-center gap-2">
                          {val}
                          <IconButton
                            type="button"
                            onClick={() => removeVariant(key, val)}
                          >
                            <LucideX />
                          </IconButton>
                        </div>
                      </VariantChip>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2">
              <span>New Variant</span>
              <InputField
                id="variant-name"
                value={newVarCat}
                onChange={(e) => {
                  setNewVarCat(e.target.value);
                }}
                maxLength={100}
                placeholder="eg. Colors"
              />
              <InputField
                id="variant-tag"
                value={newVarName}
                onChange={(e) => {
                  setNewVarName(e.target.value);
                }}
                maxLength={100}
                placeholder="eg. Black"
              />
              <Button
                disabled={!newVarCat || !newVarName}
                type="button"
                onClick={() => addVariant()}
              >
                Add
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="text-base col-span-2">
        <InputLabel htmlFor="description" text="Description" />
        <textarea
          id="description"
          maxLength={1000}
          className="w-full min-h-20 max-h-60 p-2 py-1 text-sm rounded-sm bg-[#F4F5F9] outline-1 outline-[#DBDCDE] text-[#030406] focus:outline-none"
          readOnly={readOnly}
          defaultValue={initialData.description || ""}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {!readOnly && (
        <div className="text-base col-span-2">
          <InputLabel text="Product Images" />
          <div className="flex flex-wrap gap-4 mb-4">
            {fields.map((field, index) => (
              <div key={field.id} className="relative group">
                <img
                  src={URL.createObjectURL(field.file)}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-100"
                  alt={`Upload preview ${index}`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <LucideX size={14} />
                </button>
              </div>
            ))}
            <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#DB4444] hover:bg-red-50 transition-colors">
              <LucidePlusCircle className="text-gray-400 group-hover:text-[#DB4444]" />
              <span className="text-xs text-gray-500 mt-2 text-center px-2">
                Click to add images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
          )}
        </div>
      )}

      {existingImages.length > 0 && (
        <div className="text-base col-span-2 mt-4">
          <InputLabel text="Current Images" />
          <div className="flex whitespace-nowrap w-full *:shrink-0 overflow-x-auto gap-4">
            {existingImages.map((image, index) => (
              <div
                key={image.id || index}
                aria-label="Image of product"
                className="relative group"
              >
                <img
                  src={"http://103.150.116.241:8082" + image.image_url}
                  className="bg-[#F5F5F5] p-12 h-50 aspect-square rounded-sm object-cover border-2 border-gray-100"
                  aria-hidden
                />
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <LucideX size={14} />
                  </button>
                )}
                {image.is_primary ? (
                  <span className="absolute bg-linear-to-r from-[#C2A1FD] to-[#9154FD] top-3 left-3 z-10 text-[10px] p-1 px-3 text-white rounded-xs">
                    Default
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
      {!readOnly ? (
        <div className="w-full col-span-2 flex justify-end gap-2">
          <Button
            variant="outlined"
            type="button"
            onClick={() => onCancel()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      ) : null}
    </form>
  );
};
