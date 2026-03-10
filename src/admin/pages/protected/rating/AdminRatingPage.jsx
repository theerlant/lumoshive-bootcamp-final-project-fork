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

export default function AdminRatingListPage() {
  // Logic State untuk Pagination & Filter
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(null);

  // SWR dengan Key Dinamis (otomatis fetch ulang kalau page/limit berubah)
  const { data, error, isLoading, mutate } = useSWR(
    ["admin-reviews", page, limit, search],
    () => reviewService.admin.getAll(page, limit, search),
  );

  // Logic Hapus Review
  const handleDelete = async (reviewId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus rating ini?")) {
      try {
        await reviewService.admin.delete(reviewId);
        mutate(); // Refresh data setelah hapus
      } catch (err) {
        console.error("Gagal menghapus:", err.message);
        alert("Gagal menghapus review: " + err.message);
      }
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 p-8 bg-[#F4F5F9]">ERROR {error.message}</div>
      </div>
    );
  }

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

      {/* TABLE SECTION */}
      <div className="">
        {isLoading ? (
          <div className="flex justify-center p-4">Loading...</div>
        ) : (
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
                {data?.data?.map((rating) => (
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
                          onClick={() => handleDelete(rating.id)}
                        >
                          <LucideTrash size={16} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
        )}
      </div>
    </>
  );
}
