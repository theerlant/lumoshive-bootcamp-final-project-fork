import { useEffect, useState } from "react";
import { orderService } from "../../../../shared/services/orderService";
import useSWR from "swr";
import { PackageIcon } from "lucide-react";

export const MyOrdersPage = () => {
  const {
    data: orders,
    isLoading,
    error,
    mutate,
  } = useSWR("/orders", () => orderService.public.get());

  // Helper untuk warna status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "process":
        return "bg-blue-500";
      default:
        return "bg-black";
    }
  };

  return (
    <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-md rounded-md">
      <h2 className="text-[#DB4444] text-lg font-medium mb-6">My Orders</h2>
      <div className="space-y-4">
        {isLoading ? (
          <>Loading...</>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#F5F5F5] p-4 rounded-md flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded flex items-center justify-center font-bold text-xs text-center p-2">
                  <PackageIcon />
                </div>
                <div>
                  <p className="font-bold text-sm" title={order.id}>
                    Order #{order.id.substring(0, 8)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    Total: Rp {order.total.toLocaleString()}
                  </p>
                </div>
              </div>
              <span
                className={`${getStatusStyle(order.status)} text-white text-[10px] px-4 py-1.5 rounded uppercase font-bold`}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
