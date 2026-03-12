import {
  LucideTags,
  LucideEye,
  LucidePencil,
  LucideTrash,
  LucideCheckCircle,
  LucidePlus,
} from "lucide-react";
import {
  PageLoading,
  PageEmpty,
  PageError,
} from "../../../components/SimpleConditional";
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
import { useState } from "react";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { DeleteModal, SuccessModal } from "@/admin/components/PremadeModal";
import { toTitleCase } from "../../../../shared/utils/toTitleCase";

export const AdminPromotionListPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/promotions", page, limit, sortBy, sortOrder, status],
    () => {
      const params = { page, limit };
      if (sortBy) params.sort_by = sortBy;
      if (sortOrder) params.sort_order = sortOrder;
      if (status) params.is_active = status;
      return promotionService.admin.getAll(params);
    },
  );

  const promotionsData =
    data?.data || data?.promotions || (Array.isArray(data) ? data : []);
  const paginationData = data?.pagination ||
    data?.meta || { total_items: promotionsData.length, total_pages: 1 };

  const handleTogglePublish = async (id) => {
    try {
      await promotionService.admin.toggleStatus(id);
      mutate(); // Refresh tabel agar status terbaru muncul
    } catch (err) {
      console.error("Failed to toggle status:", err);
      alert("Gagal mengubah status promosi.");
    }
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
    try {
      await promotionService.admin.delete(idToDelete);
      mutate();
      setDeleteConfirmVisible(true);
      setIdToDelete(null);
    } catch (err) {
      alert("Failed to delete promotion");
      setIdToDelete(null);
    }
  };

  return (
    <>
      <PageHeader />

      {error && (
        <PageError
          message="Cannot fetch Promotions. We will keep trying..."
          error={error}
        />
      )}
      {isLoading && <PageLoading />}

      <section id="list-table" className="mt-6">
        {!isLoading && !error && (
          <div className="w-full">
            <TableWrapper>
              <TableHeader
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleToggleSort}
              />
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
                    <TableCell colSpan={8} className="text-center py-10">
                      <PageEmpty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableWrapper>

            <div className="mt-4">
              <TablePagination
                page={page}
                limit={limit}
                totalItems={paginationData.total_items}
                totalPages={paginationData.total_pages}
                onLimitSet={(l) => {
                  setLimit(l);
                  setPage(1);
                }}
                onPageChange={(p) => setPage(p)}
              />
            </div>
          </div>
        )}
      </section>

      <DeleteModal
        isOpen={idToDelete !== null}
        title="Delete Promotion?"
        onCancel={() => setIdToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      <SuccessModal
        visible={deleteConfirmVisible}
        setVisible={setDeleteConfirmVisible}
        message="This promotion is successfully deleted"
      />
    </>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <section id="header" className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold">Promotion</h1>
        <Breadcrumbs
          items={[{ label: "Home", href: "/admin" }, { label: "Promotion" }]}
        />
      </div>
      <Button size="medium" onClick={() => navigate("./add")}>
        <p className="text-xs">Add New Promotion</p>
      </Button>
    </section>
  );
};

const TableHeader = ({ sortBy, sortOrder, onSort }) => (
  <TableHead>
    <TableHeadCol
      title="Promotion Name"
      sort={sortBy === "name" ? sortOrder : "none"}
      onSort={() => onSort("name")}
    />
    <TableHeadCol
      title="Start Date"
      sort={sortBy === "start_date" ? sortOrder : "none"}
      onSort={() => onSort("start_date")}
    />
    <TableHeadCol
      title="End Date"
      sort={sortBy === "end_date" ? sortOrder : "none"}
      onSort={() => onSort("end_date")}
    />
    <TableHeadCol
      title="Type"
      sort={sortBy === "type" ? sortOrder : "none"}
      onSort={() => onSort("discount_type")}
    />
    <TableHeadCol
      title="Description"
      sort={sortBy === "description" ? sortOrder : "none"}
      onSort={() => onSort("description")}
    />
    <TableHeadCol
      title="Active"
      sort={sortBy === "is_active" ? sortOrder : "none"}
      onSort={() => onSort("is_active")}
    />
    <TableHeadCol title="Action" />
  </TableHead>
);

const TableItem = ({ promo, onTogglePublish, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>{promo.name || "-"}</TableCell>
      <TableCell className="text-gray-500 text-sm">
        {promo.start_date
          ? new Date(promo.start_date).toLocaleDateString("id-ID")
          : "-"}
      </TableCell>
      <TableCell className="text-gray-500 text-sm">
        {promo.end_date
          ? new Date(promo.end_date).toLocaleDateString("id-ID")
          : "-"}
      </TableCell>
      <TableCell className="text-gray-500 text-sm capitalize">
        {toTitleCase(promo.discount_type)}
      </TableCell>
      <TableCell className="text-gray-500 text-sm">
        {promo.description ||
          (promo.discount_value ? `Potongan Rp ${promo.discount_value}` : "-")}
      </TableCell>
      <TableCell>
        <Switch
          on={promo.is_active}
          onChange={() => onTogglePublish(promo.id)}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <IconButton
            onClick={() => navigate(`/admin/promotions/${promo.name}`)}
            title="Detail"
          >
            <LucideEye
              size={18}
              className="text-gray-500 hover:text-blue-500 transition-colors"
            />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/admin/promotions/edit/${promo.name}`)}
            title="Edit"
          >
            <LucidePencil
              size={18}
              className="text-gray-500 hover:text-orange-500 transition-colors"
            />
          </IconButton>
          <IconButton onClick={onDelete} title="Delete">
            <LucideTrash
              size={18}
              className="text-gray-500 hover:text-red-500 transition-colors"
            />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TablePagination = ({
  page,
  limit,
  totalItems,
  totalPages,
  onLimitSet,
  onPageChange,
}) => (
  <div className="flex items-center justify-between p-4 border-t border-gray-100">
    <div className="flex-1 italic text-gray-500 text-sm">
      <PaginationInfo currentPage={page} limit={limit} total={totalItems} />
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Rows per page:</span>
        <PaginationLimiterButton limit={limit} onLimitSet={onLimitSet} />
      </div>
      <PaginationNavigation
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  </div>
);
