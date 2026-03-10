import { request } from "./client";
import api from "./client";

export const orderService = {
  public: {
    get: () => {
      return request({
        url: "/orders",
        method: "GET",
      });
    },
    create: (addressId, paymentMethod, promoCode, notes) => {
      return request({
        url: "/orders",
        method: "POST",
        data: {
          address_id: addressId,
          payment_method: paymentMethod,
          promo_code: promoCode,
          notes,
        },
      });
    },
    getById: (id) => {
      return request({
        url: `/orders/${id}`,
        method: "GET",
      });
    },
    cancel: (id) => {
      return request({
        url: `/orders/${id}/cancel`,
        method: "POST",
      });
    },
  },
  admin: {
    get: async (page = 1, limit = 10, sortBy = "created_at", sortOrder = "desc") => {
      const response = await api({
        url: "/admin/orders",
        method: "GET",
        params: {
          page,
          limit,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      // Return both data and meta
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    },
    /**
     *
     * @param {number} id
     * @param {string} status - 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
     * @param {string} trackingNumber - optional tracking number for shipped orders
     * @returns
     */
    updateStatus: (id, status, trackingNumber = null) => {
      const data = { status };
      if (trackingNumber) {
        data.tracking_number = trackingNumber;
      }
      return request({
        url: `/admin/orders/${id}/status`,
        method: "PUT",
        data,
      });
    },
  },
};
