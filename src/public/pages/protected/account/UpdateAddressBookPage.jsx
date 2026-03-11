import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountLayout } from "./components/AccountSidebar";
import { addressService } from "../../../../shared/services/addressService"; // Pastikan path benar

export const UpdateAddressBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State disesuaikan dengan kebutuhan API addressService.updateAddress
  const [formData, setFormData] = useState({
    label: "",
    recipientName: "",
    phone: "",
    addressLine: "",
    city: "",
    province: "",
    postalCode: "",
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddressDetail = async () => {
      try {
        setLoading(true);
        const res = await addressService.getById(id);
        const data = res.data.data;

        // Map data dari API (snake_case) ke state (camelCase)
        setFormData({
          label: data.label || "",
          recipientName: data.recipient_name || "",
          phone: data.phone || "",
          addressLine: data.address_line || "",
          city: data.city || "",
          province: data.province || "",
          postalCode: data.postal_code || "",
          isDefault: data.is_default || false,
        });
      } catch (err) {
        console.error("Failed to fetch address:", err);
        alert("Address not found");
        navigate("/account/address");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAddressDetail();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addressService.updateAddress(
        id,
        formData.label,
        formData.recipientName,
        formData.phone,
        formData.addressLine,
        formData.city,
        formData.province,
        formData.postalCode,
        formData.isDefault
      );
      alert("Address updated successfully!");
      navigate("/account/address");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update address. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AccountLayout>
        <div className="p-10 text-center">Loading Data...</div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      {/* Responsive: p-5 di mobile, p-10 di desktop */}
      <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-md">
        <h2 className="text-[#DB4444] text-lg font-medium mb-6">Update Your Address</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Responsive Grid: 1 kolom di mobile, 2 kolom di desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Label (e.g. Home / Office)</label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Recipient Name</label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Full Address</label>
            <textarea
              rows="4"
              required
              value={formData.addressLine}
              onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
              className="bg-[#F5F5F5] rounded-md px-4 py-3 text-sm outline-none resize-none focus:ring-1 focus:ring-[#DB4444]"
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="accent-[#DB4444]"
            />
            <label htmlFor="isDefault" className="text-sm cursor-pointer">Set as default address</label>
          </div>

          {/* Responsive Buttons: Stacked on mobile, row on desktop */}
          <div className="flex flex-col lg:flex-row justify-end items-center gap-4 lg:gap-6 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="order-2 lg:order-1 text-gray-500 text-sm hover:text-black font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="order-1 lg:order-2 w-full lg:w-auto bg-[#DB4444] text-white px-10 py-3 rounded-md text-sm font-medium hover:bg-red-600 transition shadow-sm disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};