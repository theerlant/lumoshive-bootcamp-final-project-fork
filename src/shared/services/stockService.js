import { request } from "./client";

export const stockService = {
  admin: {
    /**
     *
     * @param {number} page - page (default 1)
     * @param {number} limit - item per page (default 10)
     * @param {string} search - search by product name/SKU/description
     * @param {string} productId - filter product id
     * @param {string} actionType - 'add' | 'substract' | 'adjust' | 'return'
     * @param {string} startDate - YYYY-MM-DD
     * @param {string} endDate - YYYY-MM-DD
     * @param {string} sortBy - 'createdAt' | 'updatedAt' | (default: 'createdAt')
     * @param {string} sortOrder - 'asc' | 'desc' (default: 'desc')
     */
    getAllLog: (
      page = 1,
      limit = 10,
      search,
      productId,
      actionType,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    ) => {
      return request({
        url: "/admin/stock",
        params: {
          page,
          limit,
          search,
          product_id: productId,
          action_type: actionType,
          start_date: startDate,
          end_date: endDate,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
    },
    getLogById: (id) => {
      return request({
        url: `/admin/stock/${id}`,
      });
    },
    /**
     * Adjust stock quantity
     * @param {string} productId - product id (required)
     * @param {number} quantity - quantity to adjust (positive for add, negative for substract) (required)
     * @param {string} description - description of the adjustment (required)
     */
    adjust: (productId, quantity, description) => {
      return request({
        url: "/admin/stock/adjust",
        method: "POST",
        data: {
          product_id: productId,
          quantity,
          description,
        },
      });
    },
    getLogByProductId: (productId) => {
      return request({
        url: `/admin/products/${productId}/stock-history`,
        method: "GET",
      });
    },
    deleteLog: (id) => {
      return request({
        url: `/admin/stock/${id}`,
        method: "DELETE",
      });
    },
  },
};
