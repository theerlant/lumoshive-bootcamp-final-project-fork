import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import useSWR from "swr";
import { reviewService } from "../../../../shared/services/reviewService";

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

import {
  PaginationInfo,
  PaginationLimiterButton,
  PaginationNavigation,
} from "../../../components/Pagination";

import { LucideTrash, LucideEye } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Modal } from "@/admin/components/Modal";
import { DeleteModal, SuccessModal } from "@/admin/components/PremadeModal";
import {
  PageLoading,
  PageEmpty,
  PageError,
} from "../../../components/SimpleConditional";

export default function AdminRatingListPage() {
  // Logic State untuk Pagination & Filter
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // SWR dengan Key Dinamis (otomatis fetch ulang kalau page/limit berubah)
  const { data, error, isLoading, mutate } = useSWR(
    ["admin-reviews", page, limit, search],
    () => reviewService.admin.getAll(page, limit, search),
  );

  // Logic Hapus Review
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await reviewService.admin.delete(itemToDelete);
      mutate(); // Refresh data setelah hapus
      setItemToDelete(null);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal menghapus:", err.message);
      alert("Gagal menghapus review: " + err.message);
      setItemToDelete(null);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rating</h2>
          <Breadcrumbs
            items={[{ label: "Home", href: "/admin" }, { label: "Rating" }]}
          />
        </div>

        <Button variant="outlined" size="small">
          <span className="text-xs">Export</span>
        </Button>
      </div>

      {error && <PageError error={error} message="Failed to load ratings." />}
      {isLoading && <PageLoading />}

      {/* TABLE SECTION */}
      {!error && !isLoading && (
        <div className="">
          <>
            <TableWrapper>
              <TableColGroup
                colSizes={["18%", "22%", "10%", "30%", "10%", "10%"]}
              />

              <TableHead>
                <TableHeadCol title="User" />
                <TableHeadCol title="Product" />
                <TableHeadCol title="Rating" />
                <TableHeadCol title="Review" />
                <TableHeadCol title="Date" />
                <TableHeadCol title="Action" />
              </TableHead>

              <TableBody>
                {/* data?.data karena wrapper request lo biasanya unwrap hasil axios */}
                {data?.data?.length > 0 ? (
                  data.data.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell>{rating.user?.name || "Unknown"}</TableCell>
                      <TableCell>{rating.product?.name}</TableCell>
                      <TableCell>
                        <span className="text-yellow-500 font-medium">
                          ⭐ {rating.rating}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {rating.comment}
                        </p>
                      </TableCell>
                      <TableCell>
                        {new Date(rating.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <IconButton>
                            <LucideEye size={16} />
                          </IconButton>
                          <IconButton
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => setItemToDelete(rating.id)}
                          >
                            <LucideTrash size={16} />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <PageEmpty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableWrapper>

            {/* PAGINATION LOGIC */}
            <div className="mt-8 flex justify-between items-center border-t pt-4">
              <PaginationInfo total={data?.meta?.total ?? 0} />

              <div className="flex items-center gap-6">
                {/* Limit per page */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Rows per page:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1); // Balik ke page 1 kalau limit ganti
                    }}
                    className="text-xs border rounded p-1 outline-none"
                  >
                    {[10, 20, 50].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>

                <PaginationNavigation
                  currentPage={data?.meta?.current_page ?? 1}
                  totalPages={data?.meta?.last_page ?? 1}
                  onPageChange={(p) => setPage(p)} // Pastikan komponen ini terima prop onPageChange
                />
              </div>
            </div>
          </>
        </div>
      )}

      <DeleteModal
        isOpen={itemToDelete !== null}
        title="Delete Review?"
        onCancel={() => setItemToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      <SuccessModal
        visible={showSuccessModal}
        setVisible={setShowSuccessModal}
        message="Review deleted successfully!"
      />
    </>
  );
}
