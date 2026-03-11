import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountLayout } from "./components/AccountSidebar";
import { addressService } from "../../../../shared/services/addressService";

export const CreateAddressBookPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    recipientName: "",
    phone: "",
    addressLine: "",
    city: "",
    province: "",
    postalCode: "",
    isDefault: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addressService.addAddress(
        formData.label,
        formData.recipientName,
        formData.phone,
        formData.addressLine,
        formData.city,
        formData.province,
        formData.postalCode,
        formData.isDefault
      );
      navigate("/account/address");
    } catch (err) {
      alert("Failed to add address. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-md rounded-md">
        <h2 className="text-[#DB4444] text-lg font-medium mb-6">Create Your Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input placeholder="Label (Home/Office)" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, label: e.target.value})} required />
            <input placeholder="Recipient Name" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, recipientName: e.target.value})} required />
            <input placeholder="Phone Number" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            <input placeholder="City" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, city: e.target.value})} required />
            <input placeholder="Province" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, province: e.target.value})} required />
            <input placeholder="Postal Code" className="bg-[#F5F5F5] p-3 rounded-md text-sm outline-none" 
              onChange={(e) => setFormData({...formData, postalCode: e.target.value})} required />
          </div>
          <textarea placeholder="Full Address" rows="3" className="w-full bg-[#F5F5F5] p-3 rounded-md text-sm outline-none resize-none" 
            onChange={(e) => setFormData({...formData, addressLine: e.target.value})} required />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isDefault" onChange={(e) => setFormData({...formData, isDefault: e.target.checked})} />
            <label htmlFor="isDefault" className="text-sm">Set as default address</label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={() => navigate(-1)} className="text-gray-500 text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="bg-[#DB4444] text-white px-8 py-2 rounded-md text-sm font-medium">
              {loading ? "Saving..." : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};