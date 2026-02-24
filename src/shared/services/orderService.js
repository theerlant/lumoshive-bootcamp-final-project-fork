import { request } from "./client";

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
    get: (page = 1, limit = 10) => {
      return request({
        url: "/admin/orders",
        method: "GET",
        params: {
          page,
          limit,
        },
      });
    },
    /**
     *
     * @param {number} id
     * @param {string} status - 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
     * @returns
     */
    updateStatus: (id, status) => {
      return request({
        url: `/admin/orders/${id}/status`,
        method: "PUT",
        data: {
          status,
        },
      });
    },
  },
};
