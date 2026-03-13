import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addressService } from "../../../../shared/services/addressService"; // Pastikan path benar
import { addressSchema } from "../../../../shared/schema/addressSchema";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";

export const UpdateAddressBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      recipient_name: "",
      phone: "",
      address_line: "",
      city: "",
      province: "",
      postal_code: "",
      is_default: false,
    },
  });

  useEffect(() => {
    const fetchAddressDetail = async () => {
      try {
        setLoading(true);
        const data = await addressService.getById(id);

        const parts = data.full_address.split(",").map((part) => part.trim());
        const [city, province, postal_code] = parts.slice(-3);
        const address_line = parts.slice(0, -3).join(", ");

        reset({
          label: data.label || "",
          recipient_name: data.recipient_name || "",
          phone: data.phone || "",
          address_line: address_line || "",
          city: city || "",
          province: province || "",
          postal_code: postal_code || "",
          is_default: data.is_default || false,
        });
      } catch (err) {
        toast.error(`Failed to fetch address: ${err}`);
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAddressDetail();
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addressService.updateAddress(id, data); // Pass id and the validated data object
      toast.success("Address updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(`Failed to update address: ${err}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading Data...</div>;
  }

  //Responsive: p-5 di mobile, p-10 di desktop
  return (
    <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-md">
      <h2 className="text-[#DB4444] text-lg font-medium mb-6">
        Update Your Address
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Responsive Grid: 1 kolom di mobile, 2 kolom di desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Label (e.g. Home / Office)
            </label>
            <input
              type="text"
              {...register("label")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.label ? "border border-red-500" : ""
              }`}
            />
            {errors.label && (
              <p className="text-red-500 text-xs mt-1">
                {errors.label.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Recipient Name</label>
            <input
              type="text"
              {...register("recipient_name")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.recipient_name ? "border border-red-500" : ""
              }`}
            />
            {errors.recipient_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipient_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.phone ? "border border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              {...register("city")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.city ? "border border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Province</label>
            <input
              type="text"
              {...register("province")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.province ? "border border-red-500" : ""
              }`}
            />
            {errors.province && (
              <p className="text-red-500 text-xs mt-1">
                {errors.province.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Postal Code</label>
            <input
              type="text"
              {...register("postal_code")}
              className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444] ${
                errors.postal_code ? "border border-red-500" : ""
              }`}
            />
            {errors.postal_code && (
              <p className="text-red-500 text-xs mt-1">
                {errors.postal_code.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Full Address</label>
          <textarea
            rows="4"
            {...register("address_line")}
            className={`bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none resize-none focus:ring-1 focus:ring-[#DB4444] ${
              errors.address_line ? "border border-red-500" : ""
            }`}
          ></textarea>
          {errors.address_line && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address_line.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isDefault"
            {...register("is_default")}
            className="accent-[#DB4444]"
          />
          <label htmlFor="isDefault" className="text-sm cursor-pointer">
            Set as default address
          </label>
        </div>

        {/* Responsive Buttons: Stacked on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-6 mt-8">
          <Button
            type="button"
            variant="transparent"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};
