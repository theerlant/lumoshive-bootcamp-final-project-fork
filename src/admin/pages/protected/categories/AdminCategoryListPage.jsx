import React, { useState } from "react";

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
import IconButton from "../../../components/IconButton";
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

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronic",
      icon: "electronic.svg",
      published: true,
    },
    {
      id: 2,
      name: "Home & Lifestyle",
      icon: "home.svg",
      published: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="p-8 bg-[#F4F5F9] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Category
          </h2>

          <p className="text-sm text-gray-500">
            Home &gt; <span className="text-[#DB4444]">Category</span>
          </p>
        </div>

        <Button onClick={() => setShowCreate(true)}>
          <span className="text-xs">Add New Category</span>
        </Button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

        <TableWrapper>

          <TableColGroup
            colSizes={["40%", "25%", "20%", "15%"]}
          />

          <TableHead>
            <TableHeadCol title="Category Name" />
            <TableHeadCol title="Category Icon" />
            <TableHeadCol title="Published" />
            <TableHeadCol title="Action" />
          </TableHead>

          <TableBody>

            {categories.map((category) => (
              <TableRow key={category.id}>

                <TableCell>
                  {category.name}
                </TableCell>

                <TableCell>
                  {category.icon}
                </TableCell>

                <TableCell>
                  <Switch checked={category.published} />
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

        {/* PAGINATION */}

        <div className="mt-8 flex justify-between items-center border-t pt-4">

          <PaginationInfo total={27} />

          <div className="flex items-center gap-6">
            <PaginationLimiterButton />
            <PaginationNavigation currentPage={1} totalPages={2} />
          </div>

        </div>

      </div>

      {/* MODALS */}

      <CategoryCreateModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />

      <CategoryEditModal
        open={showEdit}
        category={selectedCategory}
        onClose={() => setShowEdit(false)}
      />

      <CategoryDeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
      />

    </div>
  );
}