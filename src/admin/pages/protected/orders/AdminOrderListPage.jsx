import React, { useState, useEffect } from "react";
import {
  TableWrapper,
  TableColGroup,
  TableHead,
  TableHeadCol,
  TableBody,
  TableRow,
  TableCell,
} from "../../../components/Table";
import OrderStatusChip from "../../../components/OrderStatusChip";
import { IconButton } from "../../../components/IconButton";
import Button from "../../../components/Button";
import { LucideCheck, LucideX, LucideEye } from "lucide-react";
import {
  PaginationInfo,
  PaginationLimiterButton,
  PaginationNavigation,
} from "../../../components/Pagination";
import { orderService } from "../../../../shared/services/orderService";
import { productService } from "../../../../shared/services/productService";
import useSWR from "swr";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export default function AdminOrderListPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [productNames, setProductNames] = useState({});

  // Helper function to map order status to OrderStatusChip status
  const getChipStatus = (status) => {
    const statusMap = {
      created: "created",
      pending: "created",
      processing: "processing",
      shipped: "processing",
      delivered: "completed",
      completed: "completed",
      cancelled: "canceled",
      canceled: "canceled",
      refunded: "canceled",
    };
    return statusMap[status] || status;
  };

  const handleAcceptClick = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleDeclineClick = (order) => {
    setSelectedOrder(order);
    setShowConfirmModal(true);
  };

  const handleReviewClick = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.admin.updateStatus(orderId, newStatus);
      // Refresh data setelah update status
      mutate();
      setShowReviewModal(false);
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  const handleShipOrder = (order) => {
    setSelectedOrder(order);
    setTrackingNumber("");
    setShowTrackingModal(true);
  };

  const handleConfirmShip = async () => {
    if (!trackingNumber.trim()) {
      alert("Please enter tracking number");
      return;
    }

    try {
      await orderService.admin.updateStatus(selectedOrder.id, "shipped", trackingNumber);
      mutate();
      setShowTrackingModal(false);
      setShowReviewModal(false);
      alert(`Order marked as shipped with tracking number: ${trackingNumber}`);
    } catch (error) {
      console.error("Failed to ship order:", error);
      alert("Failed to ship order");
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page when sorting
  };

  const getSortState = (column) => {
    if (sortBy !== column) return "none";
    return sortOrder;
  };

  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/orders", page, limit, sortBy, sortOrder], 
    () => orderService.admin.get(page, limit, sortBy, sortOrder)
  );

  const orders = data?.data || [];
  const pagination = data?.meta || { total: 0, total_pages: 1 };

  // Fetch product names when order is selected
  useEffect(() => {
    const fetchProductNames = async () => {
      if (selectedOrder && selectedOrder.items) {
        const names = {};
        for (const item of selectedOrder.items) {
          try {
            const product = await productService.public.getById(item.product_id);
            names[item.product_id] = product.name || `Product ${item.product_id}`;
          } catch (error) {
            console.error(`Failed to fetch product ${item.product_id}:`, error);
            names[item.product_id] = `Product ${item.product_id}`;
          }
        }
        setProductNames(names);
      }
    };

    fetchProductNames();
  }, [selectedOrder]); 

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          <strong>Koneksi Gagal:</strong> Server tidak merespon. Periksa koneksi ke 103.150.116.241:8082.
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="header" className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <Breadcrumbs
            items={[{ label: "Home", href: "/admin" }, { label: "Orders" }]}
          />
        </div>
        <Button variant="outlined" size="small">
          <span className="text-xs">Download all</span>
        </Button>
      </section>

      <section id="list-table">
        <TableWrapper>
          <TableColGroup colSizes={["18%", "25%", "15%", "12%", "18%", "12%"]} />
          <TableHead>
            <TableHeadCol title="User Name" sort={getSortState("user_name")} onSort={() => handleSort("user_name")} />
            <TableHeadCol title="Address" sort={getSortState("address")} onSort={() => handleSort("address")} />
            <TableHeadCol title="Payment Method" sort={getSortState("payment_method")} onSort={() => handleSort("payment_method")} />
            <TableHeadCol title="Amount" sort={getSortState("total")} onSort={() => handleSort("total")} />
            <TableHeadCol title="Status Order" sort={getSortState("status")} onSort={() => handleSort("status")} />
            <TableHeadCol title="Action" />
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                   <div className="animate-spin inline-block w-6 h-6 border-b-2 border-[#DB4444] rounded-full"></div>
                </TableCell>
              </TableRow>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  {/* Mapping nama dari user atau email jika name kosong */}
                  <TableCell>{order.user?.name || order.user?.email || "-"}</TableCell>
                  <TableCell>
                    <span className="text-[#687182] text-xs line-clamp-2">
                      {order.address?.full_address || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize">
                    {order.payment_method?.replace("_", " ")}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    Rp {order.total?.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-start">
                      <OrderStatusChip status={getChipStatus(order.status)} />
                    </div>
                  </TableCell>
                    <div className="flex gap-2">
                      {(order.status === "pending" || order.status === "created") ? (
                        <>
                          <button 
                            onClick={() => handleAcceptClick(order)}
                            className="flex items-center justify-center w-7 h-7 bg-[#00D26A] text-white rounded-full hover:bg-green-600 transition-colors">
                            <LucideCheck size={14} strokeWidth={4} />
                          </button>
                          <button 
                            onClick={() => handleDeclineClick(order)}
                            className="flex items-center justify-center w-7 h-7 bg-[#F8312F] text-white rounded-full hover:bg-red-600 transition-colors">
                            <LucideX size={14} strokeWidth={4} />
                          </button>
                        </>
                      ) : (
                        <IconButton onClick={() => handleReviewClick(order)}>
                          <LucideEye size={18} className="text-gray-500" />
                        </IconButton>
                      )}
                    </div>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-400 font-medium">
                  No orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableWrapper>
      </section>

      {/* PAGINATION: Menggunakan data dari 'meta' */}
      <section id="pagination" className="flex items-center justify-between mt-4 px-2">
        <div className="flex-1 text-sm text-gray-500 italic">
          <PaginationInfo 
            currentPage={page} 
            limit={limit} 
            total={pagination.total} 
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Rows per page:</span>
            <PaginationLimiterButton 
              limit={limit} 
              onLimitSet={(v) => { setLimit(v); setPage(1); }} 
            />
          </div>
          <PaginationNavigation 
            currentPage={page} 
            totalPages={Math.ceil(pagination.total / limit)} 
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </section>

      {/* MODAL DETAIL ORDER */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Detail Order</h2>
                <OrderStatusChip status={getChipStatus(selectedOrder.status)} />
              </div>

              {/* Info Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Customer Name</span>
                  <span className="font-bold text-gray-800">{selectedOrder.user?.name || selectedOrder.user?.email || "-"}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Address</span>
                  <span className="font-bold text-gray-800 text-right max-w-[250px] leading-tight">
                    {selectedOrder.address?.full_address || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-bold text-gray-800 text-right capitalize">{selectedOrder.payment_method?.replace("_", " ") || "-"}</span>
                </div>
              </div>

              {/* Product Table */}
              <div className="border-t border-b border-gray-100 py-2 mb-6">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="text-gray-400 uppercase tracking-wider">
                      <th className="text-left font-medium pb-2">Product Name</th>
                      <th className="text-center font-medium pb-2">Amount</th>
                      <th className="text-center font-medium pb-2">Unit Price</th>
                      <th className="text-right font-medium pb-2">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-medium">
                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-gray-500">{productNames[item.product_id] || `Loading...`}</td>
                        <td className="text-center py-2">{item.quantity}</td>
                        <td className="text-center py-2">Rp {item.unit_price?.toLocaleString("id-ID")}</td>
                        <td className="text-right py-2">Rp {item.subtotal?.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Section */}
              <div className="flex justify-end gap-6 mb-10">
                <span className="text-sm text-gray-400 font-bold">Total</span>
                <span className="text-sm font-bold text-gray-800">Rp {selectedOrder.total?.toLocaleString("id-ID")}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-8 py-2 border border-[#DB4444] text-[#DB4444] rounded-md text-sm font-bold hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, "processing")}
                  className="px-8 py-2 bg-[#DB4444] text-white rounded-md text-sm font-bold hover:bg-[#c13a3a] transition-shadow shadow-md"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRM DECLINE */}
      {showConfirmModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-[400px] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-200">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-[3px] border-[#F8312F] text-[#F8312F]">
                <span className="text-5xl font-bold leading-none">!</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Confirmation</h2>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
              Are you sure want to decline this order?
            </p>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-28 py-2.5 border border-[#DB4444] text-[#DB4444] rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
              >
                No
              </button>
              <button className="w-28 py-2.5 bg-[#DB4444] text-white rounded-lg text-sm font-bold shadow-lg shadow-red-200 hover:bg-[#c13a3a] transition-all">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REVIEW ORDER */}
      {showReviewModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-[600px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Review Order</h2>
                <OrderStatusChip status={getChipStatus(selectedOrder.status)} />
              </div>

              {/* Order Info */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-bold text-gray-800">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Customer Name</span>
                  <span className="font-bold text-gray-800">{selectedOrder.user?.name || selectedOrder.user?.email || "-"}</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Address</span>
                  <span className="font-bold text-gray-800 text-right max-w-[300px] leading-tight">
                    {selectedOrder.address?.full_address || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-bold text-gray-800 text-right capitalize">{selectedOrder.payment_method?.replace("_", " ") || "-"}</span>
                </div>
                {selectedOrder.tracking_number && (
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-gray-500">Tracking Number</span>
                    <span className="font-bold text-gray-800 text-right bg-blue-50 px-2 py-1 rounded text-blue-800">
                      {selectedOrder.tracking_number}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Order Date</span>
                  <span className="font-bold text-gray-800 text-right">
                    {new Date(selectedOrder.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Product Table */}
              <div className="border-t border-b border-gray-100 py-4 mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Order Items</h3>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 uppercase tracking-wider">
                      <th className="text-left font-medium pb-2">Product Name</th>
                      <th className="text-center font-medium pb-2">Qty</th>
                      <th className="text-center font-medium pb-2">Unit Price</th>
                      <th className="text-right font-medium pb-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-medium">
                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-gray-500">{productNames[item.product_id] || `Loading...`}</td>
                        <td className="text-center py-2">{item.quantity}</td>
                        <td className="text-center py-2">Rp {item.unit_price?.toLocaleString("id-ID")}</td>
                        <td className="text-right py-2">Rp {item.subtotal?.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Section */}
              <div className="flex justify-end gap-6 mb-8">
                <span className="text-lg text-gray-600 font-bold">Total Amount</span>
                <span className="text-lg font-bold text-gray-800">Rp {selectedOrder.total?.toLocaleString("id-ID")}</span>
              </div>

              {/* Status Update Actions */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Update Order Status</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedOrder.status === "processing" && (
                    <>
                      <button
                        onClick={() => handleShipOrder(selectedOrder)}
                        className="px-4 py-2 bg-[#2794EB] text-white rounded-md text-sm font-bold hover:bg-[#1e7ac7] transition-colors"
                      >
                        Mark as Shipped
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedOrder.id, "cancelled")}
                        className="px-4 py-2 bg-[#DC3741] text-white rounded-md text-sm font-bold hover:bg-[#b82e37] transition-colors"
                      >
                        Cancel Order
                      </button>
                    </>
                  )}
                  {selectedOrder.status === "shipped" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                      className="px-4 py-2 bg-[#198754] text-white rounded-md text-sm font-bold hover:bg-[#146c43] transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {(selectedOrder.status === "delivered" || selectedOrder.status === "completed") && (
                    <button
                      onClick={() => handleUpdateStatus(selectedOrder.id, "refunded")}
                      className="px-4 py-2 bg-[#6F42C1] text-white rounded-md text-sm font-bold hover:bg-[#5a359a] transition-colors"
                    >
                      Process Refund
                    </button>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL INPUT TRACKING NUMBER */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-[450px] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#2794EB] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Enter Tracking Number</h2>
              <p className="text-gray-500 text-sm">Please enter the tracking number for order #{selectedOrder.id}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Number *
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2794EB] focus:border-transparent outline-none transition-colors"
                  autoFocus
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Important:</p>
                    <p>Make sure the tracking number is correct. This will be shared with the customer.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShip}
                disabled={!trackingNumber.trim()}
                className="px-6 py-2 bg-[#2794EB] text-white rounded-lg text-sm font-bold hover:bg-[#1e7ac7] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Shipping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}