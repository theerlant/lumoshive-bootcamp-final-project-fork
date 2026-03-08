import Navbar from "../../../components/Navbar";
import { useState } from "react";
import useSWR from "swr";
import { categoryService } from "../../../../shared/services/categoryService";

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
import CategoryDeleteModal from "./CategoryDeleteModal";

export default function AdminCategoryListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // SWR fetcher
  const fetcher = async () => {
    const res = await categoryService.public.getAll();
    return res.data.data.data;
  };

  const { data: categories = [], error, isLoading, mutate } = useSWR(
    "categories",
    fetcher
  );

  const handleCreate = async (data) => {
    try {
      await categoryService.admin.create(data.name, true, data.icon);
      mutate(); // refresh data
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
        data.icon
      );

      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await categoryService.admin.delete(selectedCategory.id);
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  // if (isLoading) return <div className="p-8">Loading...</div>;
  // if (error) return <div className="p-8">Failed to load categories</div>;

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <div className="flex-1 p-8 bg-[#F4F5F9]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Category</h2>
            <p className="text-sm text-gray-500">
              Home &gt; <span className="text-[#DB4444]">Category</span>
            </p>
          </div>

          <Button onClick={() => setShowCreate(true)}>
            <span className="text-xs">Add New Category</span>
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <TableWrapper>
            <TableColGroup colSizes={["40%", "25%", "20%", "15%"]} />

            <TableHead>
              <TableHeadCol title="Category Name" />
              <TableHeadCol title="Category Icon" />
              <TableHeadCol title="Published" />
              <TableHeadCol title="Action" />
            </TableHead>

            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>

                  <TableCell>
                    <img
                      src={category.icon_url}
                      alt={category.name}
                      className="w-6 h-6"
                    />
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={category.is_published}
                      onChange={async () => {
                        try {
                          await categoryService.admin.togglePublish(category.id);
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
              ))}
            </TableBody>
          </TableWrapper>

          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <PaginationInfo total={27} />

            <div className="flex items-center gap-6">
              <PaginationLimiterButton />
              <PaginationNavigation currentPage={1} totalPages={2} />
            </div>
          </div>
        </div>

        <CategoryCreateModal
          isOpen={showCreate}
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
        />

        <CategoryEditModal
          isOpen={showEdit}
          category={selectedCategory}
          onClose={() => setShowEdit(false)}
          onSubmit={handleUpdate}
        />

        <CategoryDeleteModal
          isOpen={showDelete}
          category={selectedCategory}
          onClose={() => setShowDelete(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}