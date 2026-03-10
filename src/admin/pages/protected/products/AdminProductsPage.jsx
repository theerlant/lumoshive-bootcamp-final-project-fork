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

  useEffect(() => {
    if (data) console.log(data);
    if (error) console.error(error);
  }, [data, error]);

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
        {!isLoading && data ? (
          <TableWrapper>
            <TableHeader
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleToggleSort}
            />
            <TableBody>
              {data.data.map((product) => (
                <TableItem
                  key={product.id}
                  product={product}
                  onTogglePublish={handleTogglePublish}
                  onDelete={() => setIdToDelete(product.id)}
                />
              ))}
            </TableBody>
          </TableWrapper>
        ) : !error ? (
          <PageEmpty />
        ) : null}
      </section>
      {!isLoading && data ? (
        <TablePagination
          page={page}
          limit={limit}
          totalItems={data.pagination.total_items}
          totalPages={data.pagination.total_pages}
          onLimitSet={(limit) => setLimit(limit)}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : (
        <></>
      )}
      <DeleteModal
        idToDelete={idToDelete}
        onCancel={() => setIdToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
      <DeleteConfirmModal
        isVisible={deleteConfirmVisible}
        onSelfDelete={() => setDeleteConfirmVisible(false)}
      />
    </>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <section id="header" className="flex justify-between items-center mb-8">
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

const DeleteModal = ({ idToDelete, onCancel, onConfirm }) => {
  return (
    <Modal
      isOpen={idToDelete !== null} // Open if we have an item selected
      onClose={() => onCancel()}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <LucideTrash size={48} className="text-[#DC3741]" />
        <div>
          <h2 className="text-xl font-bold text-[#DC3741] mb-2">
            Delete Product?
          </h2>
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete this product?
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center mt-4">
          <Button variant="outlined" onClick={() => onCancel()}>
            No
          </Button>
          <Button onClick={() => onConfirm()}>Yes</Button>
        </div>
      </div>
    </Modal>
  );
};

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
    <Modal
      isOpen={isVisible} // Open if we have an item selected
      onClose={() => onSelfDelete()}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <LucideCheckCircle size={48} className="text-[#A5DC86]" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          This product is successfully deleted
        </h2>
      </div>
    </Modal>
  );
};
