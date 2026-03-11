import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountLayout } from "./components/AccountSidebar";
import { addressService } from "../../../../shared/services/addressService";

export const AddressBookPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await addressService.getAll();
      setAddresses(res.data.data); // Sesuaikan dengan struktur response API Anda
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await addressService.deleteAddress(id);
        fetchAddresses(); // Refresh list
      } catch (err) {
        alert("Failed to delete address");
      }
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#DB4444] text-lg font-medium">Your Address</h2>
          <Link to="/account/address/create" className="lg:hidden bg-[#DB4444] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </Link>
        </div>
        
        <div className="space-y-4 mb-8">
          {loading ? (
            <p className="text-center py-10">Loading addresses...</p>
          ) : addresses.length > 0 ? (
            addresses.map((addr) => (
              <div key={addr.id} className="bg-[#F5F5F5] p-4 lg:p-5 rounded-md flex justify-between items-center">
                <div className="pr-2">
                  <p className="font-medium text-xs lg:text-sm text-black mb-1">
                    {addr.recipient_name} | {addr.label} {addr.is_default && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded ml-2">Default</span>}
                  </p>
                  <p className="text-[10px] lg:text-sm text-gray-500">{addr.address_line}, {addr.city}</p>
                </div>
                <div className="flex gap-2 lg:gap-3 flex-shrink-0">
                  <Link to={`/account/address/update/${addr.id}`} className="text-gray-600 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 lg:w-5 lg:h-5"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                  </Link>
                  <button onClick={() => handleDelete(addr.id)} className="text-gray-600 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 lg:w-5 lg:h-5"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No address found.</p>
          )}
        </div>

        <div className="hidden lg:flex justify-end">
          <Link to="/account/address/create" className="bg-[#DB4444] text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-red-600 transition">
            Add New Address
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
};