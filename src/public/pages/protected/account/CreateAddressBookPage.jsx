import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressService } from "../../../../shared/services/addressService";
import { addressSchema } from "../../../../shared/schema/addressSchema";
import { Button } from "../../../components/Button";
import { toast } from "react-toastify";

export const CreateAddressBookPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addressService.addAddress(data);
      navigate("/me/address");
    } catch (error) {
      toast.error(`Failed to add address: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-md rounded-md">
      <h2 className="text-[#DB4444] text-lg font-medium mb-6">
        Create Your Address
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="Label (Home/Office)"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.label ? "border border-red-500" : ""
              }`}
              {...register("label")}
            />
            {errors.label && (
              <p className="text-red-500 text-xs mt-1">
                {errors.label.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Recipient Name"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.recipient_name ? "border border-red-500" : ""
              }`}
              {...register("recipient_name")}
            />
            {errors.recipient_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipient_name.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Phone Number"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.phone ? "border border-red-500" : ""
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="City"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.city ? "border border-red-500" : ""
              }`}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Province"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.province ? "border border-red-500" : ""
              }`}
              {...register("province")}
            />
            {errors.province && (
              <p className="text-red-500 text-xs mt-1">
                {errors.province.message}
              </p>
            )}
          </div>
          <div>
            <input
              placeholder="Postal Code"
              className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none ${
                errors.postal_code ? "border border-red-500" : ""
              }`}
              {...register("postal_code")}
            />
            {errors.postal_code && (
              <p className="text-red-500 text-xs mt-1">
                {errors.postal_code.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <textarea
            placeholder="Full Address"
            rows="3"
            className={`w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none resize-none ${
              errors.address_line ? "border border-red-500" : ""
            }`}
            {...register("address_line")}
          />
          {errors.address_line && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address_line.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isDefault" {...register("is_default")} />
          <label htmlFor="isDefault" className="text-sm">
            Set as default address
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="transparent"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Address"}
          </Button>
        </div>
      </form>
    </div>
  );
};
