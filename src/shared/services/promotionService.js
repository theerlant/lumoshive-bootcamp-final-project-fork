import { request } from "./client";

export const promotionService = {
  // Bagian Public (Section 11, Item 1-2)
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
  
  // Bagian Admin (Section 11, Item 3-6)
  admin: {
    // Karena di API.json tidak ada "Get All Admin", kita gunakan /promotions 
    // atau jika backend mendukung /admin/promotions silakan disesuaikan
    getAll: (params) => {
      return request({
        url: `/promotions`, // Sesuaikan ke /admin/promotions jika ada
        method: "GET",
        params,
      });
    },
    // Get Detail berdasarkan ID
    getById: (id) => {
      return request({
        url: `/admin/promotions/${id}`,
        method: "GET",
      });
    },
    // Create Promotion (Item 3)
    create: (data) => {
      return request({
        url: `/admin/promotions`,
        method: "POST",
        data,
      });
    },
    // Update Promotion (Item 4)
    update: (id, data) => {
      return request({
        url: `/admin/promotions/${id}`,
        method: "PUT",
        data,
      });
    },
    // Delete Promotion (Item 5)
    delete: (id) => {
      return request({
        url: `/admin/promotions/${id}`,
        method: "DELETE",
      });
    },
    // Toggle Promotion Status (Item 6) -> Menggunakan PUT dan endpoint /status
    toggleStatus: (id) => {
      return request({
        url: `/admin/promotions/${id}/status`,
        method: "PUT",
      });
    },
  },
};