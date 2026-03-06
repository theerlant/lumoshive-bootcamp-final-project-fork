import {
  LucideTags,
  LucideEye,
  LucidePencil,
  LucideTrash,
  LucideCheckCircle,
} from "lucide-react";
import Button from "../../../components/Button";
import Switch from "../../../components/Switch";
import {
  TableBody,
  TableHead,
  TableHeadCol,
  TableRow,
  TableCell,
  TableWrapper,
} from "../../../components/Table";
import { IconButton } from "../../../components/IconButton";
import {
  PaginationInfo,
  PaginationLimiterButton,
  PaginationNavigation,
} from "../../../components/Pagination";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/admin/components/Modal";

export const AdminPromotionListPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);
  const navigate = useNavigate();

  // Memanggil API dengan SWR
  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/promotions", page, limit, sortBy, sortOrder],
    () => promotionService.admin.getAll({ page, limit, sortBy, sortOrder })
  );

  // SAFEGUARD: Ekstraksi data agar lebih aman dari crash
  // Jika response dibungkus "data.data", ambil itu. Jika "data" langsung berupa array, ambil itu.
  const promotionsData = data?.data || (Array.isArray(data) ? data : []);
  
  // Ambil data pagination, atau sediakan fallback jika tidak ada.
  const paginationData = data?.pagination || data?.meta || { total_items: 0, total_pages: 1 };

  const handleTogglePublish = (id, newStatus) => {
    promotionService.admin.togglePublish(id, newStatus).then(() => mutate());
  };

  const handleToggleSort = (by) => {
    if (sortBy === by) {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortOrder(undefined);
        setSortBy(undefined);
      }
    } else {
      setSortBy(by);
      setSortOrder("asc");
    }
  };

  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!idToDelete) return;
    promotionService.admin.delete(idToDelete)
      .then(() => {
        mutate();
        setDeleteConfirmVisible(true);
      })
      .catch((err) => alert("Failed to delete"))
      .finally(() => setIdToDelete(null));
  };

  return (
    <>
      <PageHeader />
      {error ? <PageError error={error} /> : null}
      {isLoading ? <PageLoading /> : null}
      
      <section id="list-table">
        {!isLoading && !error ? (
          <TableWrapper>
            {/* Header dengan Filter/Sort sesuai Figma */}
            <div className="p-4 border-b">
              <select className="border rounded-md px-3 py-2 text-sm text-gray-400 w-48 focus:outline-none focus:border-[#DB4444]">
                <option>Select Filter</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <TableHeader sortBy={sortBy} sortOrder={sortOrder} onSort={handleToggleSort} />
            
            <TableBody>
              {promotionsData.length > 0 ? (
                promotionsData.map((promo) => (
                  <TableItem
                    key={promo.id}
                    promo={promo}
                    onTogglePublish={handleTogglePublish}
                    onDelete={() => setIdToDelete(promo.id)}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    <PageEmpty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableWrapper>
        ) : null}
      </section>

      {/* Tampilkan Pagination jika tidak loading dan tidak error */}
      {!isLoading && !error && (
        <TablePagination
          page={page}
          limit={limit}
          totalItems={paginationData.total_items || paginationData.total || promotionsData.length}
          totalPages={paginationData.total_pages || Math.ceil((paginationData.total || 1) / limit)}
          onLimitSet={(l) => { setLimit(l); setPage(1); }}
          onPageChange={(p) => setPage(p)}
        />
      )}

      <DeleteModal idToDelete={idToDelete} onCancel={() => setIdToDelete(null)} onConfirm={handleDeleteConfirm} />
      <DeleteConfirmModal isVisible={deleteConfirmVisible} onSelfDelete={() => setDeleteConfirmVisible(false)} />
    </>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <section id="header" className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">Promotion</h1>
        <Breadcrumbs items={[{ label: "Home", href: "/admin" }, { label: "Promotion" }]} />
      </div>
      <Button size="medium" onClick={() => navigate("./add")} className="bg-[#DB4444] text-white">
        <p className="text-xs">Add New Promotion</p>
      </Button>
    </section>
  );
};

const TableHeader = ({ sortBy, sortOrder, onSort }) => (
  <TableHead>
    <TableHeadCol title="Promotion Name" sort={sortBy === "name" ? sortOrder : "none"} onSort={() => onSort("name")} showRetails={true} />
    <TableHeadCol title="Start Date" showRetails={true} />
    <TableHeadCol title="End Date" showRetails={true} />
    <TableHeadCol title="Type" showRetails={true} />
    <TableHeadCol title="Description" showRetails={true} />
    <TableHeadCol title="Status" showRetails={true} />
    <TableHeadCol title="Published" showRetails={true} />
    <TableHeadCol title="Action" />
  </TableHead>
);

const TableItem = ({ promo, onTogglePublish, onDelete }) => {
  const navigate = useNavigate();
  // Asumsi status aktif bisa dilihat dari is_active (sesuaikan dengan API Anda)
  const isActive = promo.is_active ?? true; 

  return (
    <TableRow>
      <TableCell>{promo.name || "-"}</TableCell>
      <TableCell className="text-gray-500 text-sm">
        {promo.start_date ? new Date(promo.start_date).toLocaleDateString("id-ID") : "-"}
      </TableCell>
      <TableCell className="text-gray-500 text-sm">
        {promo.end_date ? new Date(promo.end_date).toLocaleDateString("id-ID") : "-"}
      </TableCell>
      <TableCell className="text-gray-500 text-sm capitalize">
        {promo.type ? promo.type.replace('_', ' ') : "-"}
      </TableCell>
      <TableCell className="text-gray-500 text-sm truncate max-w-[200px]">
        {promo.description || promo.discount_value ? `Potongan Rp ${promo.discount_value}` : "-"}
      </TableCell>
      <TableCell>
        <span className={`px-3 py-1 rounded-full text-xs text-white ${isActive ? 'bg-[#2D9E63]' : 'bg-[#687182]'}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell>
        <Switch on={promo.is_published} onChange={() => onTogglePublish(promo.id, !promo.is_published)} />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 text-gray-400">
          <IconButton onClick={() => navigate(`detail/${promo.id}`)} title="Detail"><LucideEye size={18} /></IconButton>
          <IconButton onClick={() => navigate(`edit/${promo.id}`)} title="Edit"><LucidePencil size={18} /></IconButton>
          <IconButton onClick={() => onDelete()} title="Delete"><LucideTrash size={18} /></IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TablePagination = ({ page, limit, totalItems, totalPages, onLimitSet, onPageChange }) => (
  <section id="pagination" className="flex items-center justify-between mt-4 mb-2 mx-2 p-4 border-t border-gray-100">
    <div className="flex-1 text-sm text-gray-500 italic">
      <PaginationInfo currentPage={page} limit={limit} total={totalItems} />
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
         <span className="text-xs text-gray-400">Rows per page:</span>
         <PaginationLimiterButton limit={limit} onLimitSet={onLimitSet} />
      </div>
      <PaginationNavigation currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  </section>
);

const DeleteModal = ({ idToDelete, onCancel, onConfirm }) => (
  <Modal isOpen={idToDelete !== null} onClose={() => onCancel()}>
    <div className="flex flex-col items-center text-center gap-6 p-4">
      <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
        <LucideTrash size={32} className="text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-red-500 mb-2">Delete Promotion?</h2>
        <p className="text-gray-800 text-base">Are you sure want to delete this promotion?</p>
      </div>
      <div className="flex gap-4 w-full justify-center mt-6">
        <Button variant="outlined" className="w-28 border-red-500 text-red-500" onClick={() => onCancel()}>No</Button>
        <Button className="w-28 bg-red-500 text-white" onClick={() => onConfirm()}>Yes</Button>
      </div>
    </div>
  </Modal>
);

const DeleteConfirmModal = ({ isVisible, onSelfDelete }) => {
  const timerRef = useRef(null);
  useEffect(() => {
    if (isVisible) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onSelfDelete(), 3000);
    }
    return () => clearTimeout(timerRef.current);
  }, [isVisible]);

  return (
    <Modal isOpen={isVisible} onClose={() => onSelfDelete()}>
      <div className="flex flex-col items-center text-center gap-6 p-4">
        <LucideCheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">This promotion is successfully deleted</h2>
      </div>
    </Modal>
  );
};

const PageError = ({ error }) => (
  <div className="bg-red-50 w-full rounded-lg p-4 font-admin border border-red-100 mt-4">
    <section id="error" className="flex flex-col items-center text-red-600">
      <p className="font-bold">Cannot fetch Promotions.</p>
      <p className="text-sm italic">{error?.message || String(error)}</p>
    </section>
  </div>
);

const PageLoading = () => (
  <div className="flex justify-center py-10 w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DB4444]"></div>
  </div>
);

const PageEmpty = () => (
  <div className="w-full text-center text-gray-500">
    <p>Sadly there's no data here</p>
  </div>
);