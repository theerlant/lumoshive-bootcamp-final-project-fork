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
import { DeleteModal, SuccessModal } from "@/admin/components/PremadeModal";
import {
  PageLoading,
  PageEmpty,
  PageError,
} from "../../../components/SimpleConditional";

export default function AdminStockListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
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
      setError(err);
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
    <div className="space-y-6">
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
        <Button onClick={() => navigate("/admin/stocks/add")}>
          <p className="text-xs">Add New Stock</p>
        </Button>
      </div>

      {/* <div className="flex w-full justify-end">
        <div className="bg-purple-100 text-purple-600 p-1 px-2 rounded-lg text-end min-w-[80px]">
          <div className="text-xl font-bold">{totalItems}</div>
          <div className="text-[10px]">Total Log</div>
        </div>
      </div> */}

      {error && <PageError error={error} message="Failed to load stock list" />}
      {loading && <PageLoading />}

      {!loading && !error && (
        <>
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
              {stocks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-400"
                  >
                    <PageEmpty />
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
        </>
      )}

      <DeleteModal
        isOpen={modalType === "delete"}
        title="Delete Stock Log?"
        onCancel={() => setModalType(null)}
        onConfirm={handleDelete}
      />

      <SuccessModal
        visible={modalType?.startsWith("success")}
        setVisible={(visible) => !visible && setModalType(null)}
        message={
          modalType ? `Success! Stock was ${modalType.split("-")[1]}ed.` : ""
        }
      />
    </div>
  );
}
