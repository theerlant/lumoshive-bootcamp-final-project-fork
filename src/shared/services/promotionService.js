import { request } from "./client";

export const promotionService = {
  public: {
    get: (params) => {
      return request({
        url: `/promotions`,
        method: "GET",
        params,
      });
    },
    getByCode: (code) => {
      return request({
        url: `/promotions/${code}`,
        method: "GET",
      });
    },
  },
  
  admin: {
    getAll: (params) => {
      return request({
        url: `/promotions`,
        method: "GET",
        params,
      });
    },

    getByCode: (code) => {
      return request({
        url: `/promotions/${code}`,
        method: "GET",
      });
    },

    create: (data) => {
      return request({
        url: `/admin/promotions`,
        method: "POST",
        data,
      });
    },

    update: (id, data) => {
      return request({
        url: `/admin/promotions/${id}`,
        method: "PUT",
        data,
      });
    },

    delete: (id) => {
      return request({
        url: `/admin/promotions/${id}`,
        method: "DELETE",
      });
    },
 
    toggleStatus: (id) => {
      return request({
        url: `/admin/promotions/${id}/status`,
        method: "PUT",
      });
    },
  },
};