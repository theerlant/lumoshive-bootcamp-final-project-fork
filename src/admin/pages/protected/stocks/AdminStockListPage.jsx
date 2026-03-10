import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Search, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { InputField } from "../../../components/InputField";
import {
  TableWrapper,
  TableHead,
  TableHeadCol,
  TableBody,
  TableRow,
  TableCell,
} from "../../../components/Table";
import {
  PaginationNavigation,
  PaginationInfo,
  PaginationLimiterButton,
} from "../../../components/Pagination";
import { IconButton } from "../../../components/IconButton";
import { stockService } from "../../../../shared/services/stockService";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "../../../components/Modal";

export default function AdminStockListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const currentSearch = search?.trim() || undefined;
      const res = await stockService.admin.getAllLog(page, 10, currentSearch);
      console.log("Struktur asli dari client.js:", res);
      const actualData = res?.data || res?.data?.data || [];
      const pagination = res?.pagination || {};

      setStocks(actualData);
      setTotalItems(pagination.total_items || actualData.length || 0);
    } catch (err) {
      console.error("Gagal mengambil data stock:", err);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStocks();
    }, 500);
    return () => clearTimeout(handler);
  }, [page, search]);

  useEffect(() => {
    if (location.state?.successMessage) {
      setModalType(location.state.successType);
      window.history.replaceState({}, document.title);
      setTimeout(() => setModalType(null), 3000);
    }
  }, [location]);

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await stockService.admin.deleteLog(selectedItem.id);
      setModalType("success-delete");
      fetchStocks();
      setTimeout(() => setModalType(null), 2000);
    } catch (err) {
      alert(err.message || "Gagal menghapus stok");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/admin" },
              { label: "Stock", href: "/admin/stocks" },
            ]}
          />
        </div>
        <Button
          onClick={() => navigate("/admin/stocks/add")}
          className="bg-[#DB4444] rounded-lg px-3 py-2 text-white"
        >
          Add New Stock
        </Button>
      </div>

      {/* <div className="flex w-full justify-end">
        <div className="bg-purple-100 text-purple-600 p-1 px-2 rounded-lg text-end min-w-[80px]">
          <div className="text-xl font-bold">{totalItems}</div>
          <div className="text-[10px]">Total Log</div>
        </div>
      </div> */}

      <TableWrapper>
        <TableHead>
          <TableHeadCol title="Product Name" />
          <TableHeadCol title="SKU" />
          <TableHeadCol title="Quantity" />
          {/* <TableHeadCol title="Type" /> */}
          <TableHeadCol title="Description" />
          <TableHeadCol title="Action" />
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          ) : stocks.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-gray-400"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.product_name}
                </TableCell>
                <TableCell>{item.product_sku}</TableCell>
                <TableCell>
                  <span className="font-bold text-gray-700">
                    {item.quantity}
                  </span>
                </TableCell>
                {/* <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.action_type === 'subtract' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.action_type}
                    </span>
                  </TableCell> */}
                <TableCell className="text-gray-500 text-sm italic">
                  {item.description || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      onClick={() =>
                        navigate(`/admin/stocks/detail/${item.id}`)
                      }
                    >
                      <Eye size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedItem(item);
                        setModalType("delete");
                      }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableWrapper>

      <div className="mt-4 flex justify-between items-center">
        <PaginationInfo currentPage={page} limit={10} total={totalItems} />
        <div className="flex gap-2">
          <PaginationLimiterButton />
          <PaginationNavigation
            totalPages={Math.ceil(totalItems / 10) || 1}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
        <div className="w-full text-center">
          {modalType === "delete" && (
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Trash2 className="text-red-500" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Delete Stock Log?</h2>
                <p className="text-gray-500 mt-2">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outlined" onClick={() => setModalType(null)}>
                  Cancel
                </Button>
                <Button onClick={handleDelete}>Yes, Delete</Button>
              </div>
            </div>
          )}

          {modalType?.startsWith("success") && (
            <div className="space-y-6 pb-2">
              <CheckCircle
                className="mx-auto text-emerald-400"
                size={80}
                strokeWidth={1}
              />
              <h2 className="text-xl font-medium">
                Success! Stock was {modalType.split("-")[1]}ed.
              </h2>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
