import {
  LucidePackage,
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

import { productService } from "../../../../shared/services/productService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";

import { Modal } from "@/admin/components/Modal";
import { DeleteModal, SuccessModal } from "@/admin/components/PremadeModal";
import {
  PageLoading,
  PageEmpty,
  PageError,
} from "../../../components/SimpleConditional";

// Tutorial slicing halaman.

/*
  1. Baca pattern halaman.
  Disini aku dapet 
  - PageHeader
  - TableHeader
  - TableItem -- per item di tabel
  - TablePagination.

  + Tambahan
  - PageError
  - PageLoading
*/

/*
  DONE.
  Sekarang page ini sudah mengikuti pattern (container - presentational)
*/

// Komponen utama yang diexport berupa container yang berisi state, logika fetching dan loading.
export const AdminProductsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);
  //TODO: Filter & search

  const navigate = useNavigate();

  const { data, error, isLoading, mutate } = useSWR(
    ["/products", page, limit, sortBy, sortOrder],
    () =>
      productService.public.getAll({
        page,
        limit,
        sortBy,
        sortOrder,
      }),
  );

  const handleTogglePublish = (productId, newStatus) => {
    productService.admin
      .togglePublish(productId, newStatus)
      .then(() => mutate());
  };

  /**
   * Toggle sort and automatically switch asc, desc or disable sort.
   * Switch pattern: undefined -> asc -> desc -> undefined
   * @param {string} by - name | price | created_at | updated_at
   */
  const handleToggleSort = (by) => {
    if (sortBy === by) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
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

    productService.admin
      .delete(idToDelete)
      .then(() => {
        mutate();
        setDeleteConfirmVisible(true);
      })
      .catch(() => alert("TODO CARD"))
      .finally(() => setIdToDelete(null));
  };

  return (
    <>
      {" "}
      <PageHeader />
      {error ? (
        <PageError
          message="Cannot fetch Products. We will keep trying..."
          error={error}
        />
      ) : null}
      {isLoading ? <PageLoading /> : null}
      <section id="list-table">
        {!isLoading && !error && (
          <div className="w-full">
            <TableWrapper>
              <TableHeader
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleToggleSort}
              />
              <TableBody>
                {data?.data?.length > 0 ? (
                  data.data.map((product) => (
                    <TableItem
                      key={product.id}
                      product={product}
                      onTogglePublish={handleTogglePublish}
                      onDelete={() => setIdToDelete(product.id)}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <PageEmpty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableWrapper>

            {data && (
              <TablePagination
                page={page}
                limit={limit}
                totalItems={data.pagination.total_items}
                totalPages={data.pagination.total_pages}
                onLimitSet={(limit) => setLimit(limit)}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        )}
      </section>
      <DeleteModal
        isOpen={idToDelete !== null}
        idToDelete={idToDelete}
        onCancel={() => setIdToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
      <SuccessModal
        visible={deleteConfirmVisible}
        setVisible={setDeleteConfirmVisible}
        message="This product is successfully deleted"
      />
    </>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <section id="header" className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold">Product</h1>
        <Breadcrumbs
          items={[{ label: "Home", href: "/admin" }, { label: "Product" }]}
        />
      </div>
      <Button size="medium" onClick={() => navigate("./add")}>
        <p className="text-xs">Add New Product</p>
      </Button>
    </section>
  );
};

const TableHeader = ({ sortBy, sortOrder, onSort }) => {
  return (
    <TableHead>
      <TableHeadCol
        title="Product Name"
        sort={sortBy === "name" ? sortOrder : "none"}
        onSort={() => onSort("name")}
      />
      <TableHeadCol title="SKU" />
      <TableHeadCol title="Stock" />
      <TableHeadCol title="Category" />
      <TableHeadCol
        title="Price"
        sort={sortBy === "price" ? sortOrder : "none"}
        onSort={() => onSort("price")}
      />
      <TableHeadCol title="Published" />
      <TableHeadCol title="Action" />
    </TableHead>
  );
};

const TableItem = ({ product, onTogglePublish, onDelete }) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>Rp {product.price}</TableCell>
      <TableCell>
        <Switch
          on={product.is_published}
          onChange={() => onTogglePublish(product.id, !product.is_published)}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <IconButton onClick={() => navigate(product.id)} title="Detail">
            <LucideEye />
          </IconButton>
          <IconButton
            onClick={() => navigate(`${product.id}/edit`)}
            title="Edit"
          >
            <LucidePencil />
          </IconButton>
          <IconButton onClick={() => onDelete()} title="Delete">
            <LucideTrash />
          </IconButton>
        </div>{" "}
      </TableCell>
    </TableRow>
  );
};

// kalau bisa keluarkan data yang tidak penting alias props langsung ke data yang dibutuhkan
const TablePagination = ({
  page,
  limit,
  totalItems,
  totalPages,
  onLimitSet,
  onPageChange,
}) => {
  return (
    <section id="pagination" className="flex mt-4 mb-2 mx-2 gap-2">
      <div className="flex-1">
        <PaginationInfo currentPage={page} limit={limit} total={totalItems} />
      </div>
      <PaginationLimiterButton limit={limit} onLimitSet={onLimitSet} />
      <PaginationNavigation
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
};
