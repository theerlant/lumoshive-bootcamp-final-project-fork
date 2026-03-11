import { useEffect, useState } from "react";
import { AccountLayout } from "./components/AccountSidebar";
import { orderService } from "../../../../shared/services/orderService";

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.public.get();
        setOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Helper untuk warna status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'process': return 'bg-blue-500';
      default: return 'bg-black';
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white p-5 lg:p-10 shadow-none lg:shadow-md rounded-md">
        <h2 className="text-[#DB4444] text-lg font-medium mb-6">My Orders</h2>
        <div className="space-y-4">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.map((order) => (
            <div key={order.id} className="bg-[#F5F5F5] p-4 rounded-md flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded flex items-center justify-center font-bold text-xs text-center p-2">
                   📦
                </div>
                <div>
                  <p className="font-bold text-sm">Order #{order.id.substring(0,8)}</p>
                  <p className="text-xs text-gray-500">Total: Rp {order.total_price?.toLocaleString()}</p>
                </div>
              </div>
              <span className={`${getStatusStyle(order.status)} text-white text-[10px] px-4 py-1.5 rounded uppercase font-bold`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};