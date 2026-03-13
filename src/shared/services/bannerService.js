import { request } from "./client";

export const bannerService = {
  public: {
    getActives: () => {
      return request({
        url: "/banners/active",
        method: "GET",
      });
    },
    getByPosition: (position = "home") => {
      return request({
        url: `/banners/position/${position}`,
        method: "GET",
      });
    },
  },
  admin: {
    getAll: (page = 1, limit = 10) => {
      return request({
        url: `/banners?page=${page}&limit=${limit}`,
        method: "GET",
      });
    },
    getById: (id) => {
      return request({
        url: `/banners/${id}`,
        method: "GET",
      });
    },
    // Menggunakan FormData agar sesuai dengan multipart-form di API
    create: (formData) => {
      return request({
        url: "/banners",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    update: (id, formData) => {
      return request({
        url: `/banners/${id}`,
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    delete: (id) => {
      return request({
        url: `/banners/${id}`,
        method: "DELETE",
      });
    },
  },
  updateOrder: (ids = []) => {
    return request({
      url: "/banners/order",
      method: "PUT",
      data: { banner_ids: ids },
    });
  },
  togglePublish: (id) => {
    return request({
      url: `/banners/${id}/toggle-publish`,
      method: "PATCH",
    });
  },
};