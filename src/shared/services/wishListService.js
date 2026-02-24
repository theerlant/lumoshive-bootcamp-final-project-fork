import { request } from "./client";

export const wishListService = {
  public: {
    get: (page = 1, limit = 10) => {
      return request({
        url: "/wishlist",
        method: "GET",
        params: {
          page,
          limit,
        },
      });
    },
    add: (productId) => {
      return request({
        url: "/wishlist",
        method: "POST",
        data: {
          product_id: productId,
        },
      });
    },
    remove: (productId) => {
      return request({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      });
    },
    check: (productId) => {
      return request({
        url: `/wishlist/check/${productId}`,
        method: "GET",
      });
    },
    count: () => {
      return request({
        url: "/wishlist/count",
        method: "GET",
      });
    },
  },
};
