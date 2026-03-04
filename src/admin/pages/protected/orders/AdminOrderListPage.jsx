import React, { useState } from 'react';
import { 
  TableWrapper, 
  TableColGroup, 
  TableHead, 
  TableHeadCol, 
  TableBody, 
  TableRow, 
  TableCell 
} from "../../../components/Table";
import OrderStatusChip from "../../../components/OrderStatusChip";
import IconButton from "../../../components/IconButton";
import Button from "../../../components/Button";
import { LucideCheck, LucideX, LucideEye } from "lucide-react";
import { 
  PaginationInfo, 
  PaginationLimiterButton, 
  PaginationNavigation 
} from "../../../components/Pagination";

const ordersData = [
  { id: 1, user: 'kevindebruyne', address: 'Jl. Pangeran Antasari No.13', method: 'Debit Online', amount: '$250', status: 'created' },
  { id: 2, user: 'philfoden', address: 'Jl. Jendral Sudirman No. 43', method: 'Gopay', amount: '$150', status: 'processing' },
  { id: 3, user: 'philfoden', address: 'Jl. Jendral Sudirman No. 43', method: 'Gopay', amount: '$150', status: 'canceled' },
  { id: 4, user: 'philfoden', address: 'Jl. Jendral Sudirman No. 43', method: 'Gopay', amount: '$150', status: 'completed' },
];

export default function AdminOrderListPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAcceptClick = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleDeclineClick = (order) => {
    setSelectedOrder(order);
    setShowConfirmModal(true);
  };

  return (
    <div className="p-8 bg-[#F4F5F9] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-500">
            Home &gt; <span className="text-[#DB4444]">Orders</span>
          </p>
        </div>
        <Button variant="outlined" size="small">
          <span className="text-xs">Download all</span>
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <TableWrapper>
          <TableColGroup colSizes={["18%", "25%", "15%", "12%", "18%", "12%"]} />
          <TableHead>
            <TableHeadCol title="User Name" sort="none" />
            <TableHeadCol title="Address" sort="none" />
            <TableHeadCol title="Payment Method" sort="none" />
            <TableHeadCol title="Amount" sort="none" />
            <TableHeadCol title="Status Order" sort="none" />
            <TableHeadCol title="Action" />
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.user}</TableCell>
                <TableCell>
                   <span className="text-[#687182]">{order.address}</span>
                </TableCell>
                <TableCell>{order.method}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <div className="flex justify-start">
                    <OrderStatusChip status={order.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {(order.status === 'created' || order.status === 'processing') ? (
                      <>
                        {/* Tombol Accept Bulat Hijau */}
                        <button 
                          onClick={() => handleAcceptClick(order)}
                          className="flex items-center justify-center w-7 h-7 bg-[#00D26A] hover:bg-[#00b35a] text-white rounded-full transition-colors"
                        >
                          <LucideCheck size={16} strokeWidth={4} />
                        </button>
                        
                        {/* Tombol Decline Bulat Merah */}
                        <button 
                          onClick={() => handleDeclineClick(order)}
                          className="flex items-center justify-center w-7 h-7 bg-[#F8312F] hover:bg-[#d62a28] text-white rounded-full transition-colors"
                        >
                          <LucideX size={16} strokeWidth={4} />
                        </button>
                      </>
                    ) : (
                      <IconButton>
                        <LucideEye className="text-[#6C757D]" size={20} />
                      </IconButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>

        {/* Footer Pagination */}
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          <PaginationInfo total={27} />
          <div className="flex items-center gap-6">
            <PaginationLimiterButton />
            <PaginationNavigation currentPage={1} totalPages={2} />
          </div>
        </div>
      </div>

      {/* MODAL ACCEPT - DETAIL ORDER */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Detail Order</h2>
                <OrderStatusChip status="created" />
              </div>

              {/* Info Grid */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Customer Name</span>
                  <span className="font-bold text-gray-800">EL-5414587</span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Address</span>
                  <span className="font-bold text-gray-800 text-right max-w-[250px] leading-tight">
                    Jl. Jendral Sudirman No. 13 Bandung, Jawa Barat
                  </span>
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-bold text-gray-800 text-right">Gopay</span>
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
                    <tr>
                      <td className="py-2 text-gray-500">HP Pavilion 14-DV0514TX</td>
                      <td className="text-center py-2">1</td>
                      <td className="text-center py-2">$950</td>
                      <td className="text-right py-2">$950</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-500">HP Pavilion 14-DV0514TX</td>
                      <td className="text-center py-2">1</td>
                      <td className="text-center py-2">$950</td>
                      <td className="text-right py-2">$950</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Section */}
              <div className="flex justify-end gap-6 mb-10">
                <span className="text-sm text-gray-400 font-bold">Sub Total</span>
                <span className="text-sm font-bold text-gray-800">$2,850</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-8 py-2 border border-[#DB4444] text-[#DB4444] rounded-md text-sm font-bold hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-8 py-2 bg-[#DB4444] text-white rounded-md text-sm font-bold hover:bg-[#c13a3a] transition-shadow shadow-md">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DECLINE - CONFIRMATION */}
      {showConfirmModal && (
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
    </div>
  );
}