import React from "react";
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

import {
  PaginationInfo,
  PaginationLimiterButton,
  PaginationNavigation,
} from "../../../components/Pagination";

import { LucideTrash, LucideEye } from "lucide-react";

import useSWR from "swr";
import { ratingService } from "../../../../shared/services/ratingService";

export default function AdminRatingListPage() {

  const { data, error, isLoading } = useSWR("/admin/ratings", () =>
    ratingService.admin.get()
  );

  if (error) {
    return <div>ERROR {error.message}</div>;
  }

  return (
    <div className="p-8 bg-[#F4F5F9] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rating</h2>
          <p className="text-sm text-gray-500">
            Home &gt; <span className="text-[#DB4444]">Rating</span>
          </p>
        </div>

        <Button variant="outlined" size="small">
          <span className="text-xs">Export</span>
        </Button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TableWrapper>

            <TableColGroup
              colSizes={["18%", "22%", "10%", "30%", "10%", "10%"]}
            />

            <TableHead>
              <TableHeadCol title="User" sort="none" />
              <TableHeadCol title="Product" sort="none" />
              <TableHeadCol title="Rating" sort="none" />
              <TableHeadCol title="Review" sort="none" />
              <TableHeadCol title="Date" sort="none" />
              <TableHeadCol title="Action" />
            </TableHead>

            <TableBody>

              {data
                ? Array.from(data.data).map((rating) => {
                    return (
                      <TableRow key={rating.id}>

                        <TableCell>
                          {rating.user.name}
                        </TableCell>

                        <TableCell>
                          {rating.product.name}
                        </TableCell>

                        <TableCell>
                          ⭐ {rating.rating}
                        </TableCell>

                        <TableCell>
                          {rating.review}
                        </TableCell>

                        <TableCell>
                          {rating.created_at}
                        </TableCell>

                        <TableCell>
                          <div className="flex gap-2">

                            <IconButton>
                              <LucideEye size={16} />
                            </IconButton>

                            <IconButton>
                              <LucideTrash size={16} />
                            </IconButton>

                          </div>
                        </TableCell>

                      </TableRow>
                    );
                  })
                : null}

            </TableBody>

          </TableWrapper>
        )}

        {/* PAGINATION */}
        <div className="mt-8 flex justify-between items-center border-t pt-4">

          <PaginationInfo total={27} />

          <div className="flex items-center gap-6">
            <PaginationLimiterButton />
            <PaginationNavigation currentPage={1} totalPages={2} />
          </div>

        </div>

      </div>
    </div>
  );
}