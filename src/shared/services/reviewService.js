import { request } from "./client";

// TODO: Ask documentation for this
export const reviewService = {
  user: {
    getByProduct: (productId) => {
      return request({
        url: `/reviews/products/${productId}`,
        method: "GET",
      });
    },
    getSummaryByProduct: (productId) => {
      return request({
        url: `/reviews/products/${productId}/stats`,
        method: "GET",
      });
    },
    post: (productId, orderId, rating, comment = "") => {
      return request({
        url: "/reviews",
        method: "POST",
        data: {
          product_id: productId,
          order_id: orderId,
          rating,
          comment,
        },
      });
    },
    update: (id, rating, comment) => {
      return request({
        url: `/reviews/${id}`,
        method: "PUT",
        data: {
          rating,
          comment,
        },
      });
    },
    delete: (id) => {
      return request({
        url: `/reviews/${id}`,
        method: "DELETE",
      });
    },
  },
  admin: {
    /**
     * Get all reviews of all products
     * @param {number} page - page of reviews
     * @param {number} limit - limit per page (default 10)
     * @param {string} search - search by email
     * @param {number} rating - rating filter
     * @param {string} sortBy - sort by: 'review_date' | 'rating'
     * @param {string} sortOrder - sort order: 'asc' | 'desc'
     */
    getAll: (
      page = 1,
      limit = 10,
      search = null,
      rating = null,
      sortBy = "review_date",
      sortOrder = "desc",
    ) => {
      const query = new URLSearchParams();
      query.append("page", page);
      query.append("limit", limit);
      query.append("sort_by", sortBy);
      query.append("sort_order", sortOrder);
      if (search) query.append("search", search);
      if (rating) query.append("rating", rating);

      return request({
        url: "admin/reviews",
        method: "GET",
      });
    },
    delete: (reviewId) => {
      return request({
        url: `/admin/reviews/${reviewId}`,
        method: "DELETE",
      });
    },
  },
};
