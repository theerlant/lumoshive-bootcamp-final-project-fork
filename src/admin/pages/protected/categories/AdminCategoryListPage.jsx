import Navbar from "../../../components/Navbar";
import { useState } from "react";
import useSWR from "swr";
import { usePagination } from "@/shared/hooks/usePagination";
import { useSort } from "@/shared/hooks/useSort";
import { categoryService } from "../../../../shared/services/categoryService";
import {
  PageLoading,
  PageEmpty,
  PageError,
} from "../../../components/SimpleConditional";

import {
  TableWrapper,
  TableColGroup,
  TableHead,
  TableHeadCol,
  TableBody,
  TableRow,
  TableCell,
} from "../../../components/Table";

import Button from "../../../components/Button";
import { IconButton } from "../../../components/IconButton";
import Switch from "../../../components/Switch";

import {
  PaginationInfo,
  PaginationLimiterButton,
  PaginationNavigation,
} from "../../../components/Pagination";

import { LucidePencil, LucideTrash } from "lucide-react";

import CategoryCreateModal from "./CategoryCreateModal";
import CategoryEditModal from "./CategoryEditModal";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Modal } from "@/admin/components/Modal";
import { DeleteModal, SuccessModal } from "@/admin/components/PremadeModal";

export default function AdminCategoryListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { page, limit, setPage, setLimit } = usePagination(1, 10);
  const { sortBy, sortOrder, onSort } = useSort();

  const {
    data: resData,
    error,
    isLoading,
    mutate,
  } = useSWR(["categories", page, limit, sortBy, sortOrder], async () => {
    const res = await categoryService.public.getAll({
      page,
      limit,
      sort_by: sortBy,
      sort_order: sortOrder,
    });
    return res.data;
  });

  const categories = resData?.data || resData || [];
  const paginationData = resData?.pagination ||
    resData?.meta || { total_items: categories.length || 0, total_pages: 1 };

  const handleCreate = async (data) => {
    try {
      await categoryService.admin.create(data.name, true, data.icon);
      mutate(); // refresh data
      setSuccessMessage("Category created successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await categoryService.admin.update(
        selectedCategory.id,
        data.name,
        selectedCategory.is_published,
        data.icon,
      );

      mutate();
      setSuccessMessage("Category updated successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(selectedCategory.id);
      await categoryService.admin.delete(selectedCategory.id);
      mutate();
      setShowDelete(false);
      setSuccessMessage("Category deleted successfully!");
      setShowSuccessModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // if (isLoading) return <div className="p-8">Loading...</div>;
  // if (error) return <div className="p-8">Failed to load categories</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category</h2>
          <Breadcrumbs
            items={[{ label: "Home", href: "/admin" }, { label: "Category" }]}
          />
        </div>

        <Button size="medium" onClick={() => setShowCreate(true)}>
          <span className="text-xs">Add New Category</span>
        </Button>
      </div>

      {error ? (
        <PageError
          message="Cannot fetch Categories. We will keep trying..."
          error={error}
        />
      ) : null}
      {isLoading ? <PageLoading /> : null}

      {!isLoading && !error && (
        <>
          <TableWrapper>
            <TableColGroup colSizes={["40%", "25%", "20%", "15%"]} />

            <TableHead>
              <TableHeadCol
                title="Category Name"
                sort={sortBy === "name" ? sortOrder : "none"}
                onSort={() => onSort("name")}
              />
              <TableHeadCol title="Category Icon" />
              <TableHeadCol
                title="Published"
                sort={sortBy === "is_published" ? sortOrder : "none"}
                onSort={() => onSort("is_published")}
              />
              <TableHeadCol title="Action" />
            </TableHead>

            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>

                    <TableCell>
                      {/* Bug dari backend return url tidak sama hostname (ip address) nya */}
                      <img
                        src={`http://103.150.116.241:8082${category.icon_url}`}
                        alt={category.name}
                        className="w-6 h-6"
                      />
                    </TableCell>

                    <TableCell>
                      <Switch
                        on={category.is_published}
                        onChange={async () => {
                          try {
                            await categoryService.admin.togglePublish(
                              category.id,
                            );
                            mutate();
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowEdit(true);
                          }}
                        >
                          <LucidePencil size={16} />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowDelete(true);
                          }}
                        >
                          <LucideTrash size={16} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <PageEmpty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </TableWrapper>

          <div className="mt-4 flex justify-between items-center">
            <PaginationInfo
              currentPage={page}
              limit={limit}
              total={paginationData.total_items}
            />

            <div className="flex items-center gap-6">
              <PaginationLimiterButton limit={limit} onLimitSet={setLimit} />
              <PaginationNavigation
                currentPage={page}
                totalPages={paginationData.total_pages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </>
      )}

      <CategoryCreateModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
      />

      <CategoryEditModal
        isOpen={showEdit}
        category={selectedCategory}
        onClose={() => setShowEdit(false)}
        onConfirm={handleUpdate}
      />

      <DeleteModal
        isOpen={showDelete}
        title="Delete Category?"
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />

      <SuccessModal
        visible={showSuccessModal}
        setVisible={setShowSuccessModal}
        message={successMessage}
      />
    </>
  );
}
