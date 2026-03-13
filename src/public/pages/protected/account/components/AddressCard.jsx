import { SquarePenIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddressCard = ({ addr, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div
      key={addr.id}
      className="bg-[#F5F5F5] p-4 lg:p-5 rounded-md flex justify-between items-center"
    >
      <div className="pr-2 text-xs lg:text-sm text-black">
        <p className="font-medium mb-1">
          {addr.recipient_name} | {addr.label}{" "}
          {addr.is_default && (
            <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded ml-2">
              Default
            </span>
          )}
        </p>
        <p className="lg:text-sm">{addr.full_address}</p>
      </div>
      <div className="flex gap-2 lg:gap-3 shrink-0">
        <button
          type="button"
          onClick={() => navigate(`/me/address/${addr.id}`)}
          className="text-gray-600 hover:text-black"
        >
          <SquarePenIcon />
        </button>
        <button
          type="button"
          onClick={() => handleDelete(addr.id)}
          className="text-gray-600 hover:text-red-500"
        >
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
};
