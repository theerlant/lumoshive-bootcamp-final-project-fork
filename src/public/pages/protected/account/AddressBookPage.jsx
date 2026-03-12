import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { addressService } from "../../../../shared/services/addressService";
import { Button } from "../../../components/Button";
import { AddressCard } from "./components/AddressCard";
import { toast } from "react-toastify";
import { useState } from "react";
import { DeleteModal } from "../../../components/PremadeModal";

export const AddressBookPage = () => {
  const navigate = useNavigate();
  const {
    data: addresses = [],
    isLoading: loading,
    mutate,
  } = useSWR("/address", async () => addressService.getAll());

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleDelete = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!addressToDelete) return;
    try {
      await addressService.deleteAddress(addressToDelete);
      mutate(); // Refresh list
      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error(`Failed to delete address: ${error.message}`);
    } finally {
      setIsDeleteModalOpen(false);
      setAddressToDelete(null);
    }
  };

  return (
    <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-[0_0_10px_rgba(0,0,0,0.05)] rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#DB4444] text-lg font-medium">Your Address</h2>
        <Link
          to="/account/address/create"
          className="lg:hidden bg-[#DB4444] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>

      <div className="space-y-4 mb-8">
        {loading ? (
          <p className="text-center py-10">Loading addresses...</p>
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard addr={addr} handleDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center text-gray-500">No address found.</p>
        )}
      </div>

      <div className="hidden lg:flex justify-end">
        <Button onClick={() => navigate("/me/address/new")}>
          Add New Address
        </Button>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        title="Delete Address?"
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
