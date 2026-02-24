import { request } from "./client";

export const productService = {
  public: {
    getAll: (
      page = 1,
      limit = 10,
      search,
      categoryId,
      isNew,
      minPrice,
      maxPrice,
      sortBy,
      inStock,
      sortOrder,
    ) => {
      return request({
        url: "/products",
        method: "GET",
        params: {
          page,
          limit,
          search,
          category_id: categoryId,
          is_new: isNew,
          min_price: minPrice,
          max_price: maxPrice,
          in_stock: inStock,
          sort_by: sortBy,
          sort: sortOrder,
        },
      });
    },
    getBestSeller: (limit = 10, days = 30) => {
      return request({
        url: "/products/best-seller",
        method: "GET",
        params: {
          limit,
          days,
        },
      });
    },
    /**
     * Get random products
     * @param {number} limit
     * @param {string} exclude_id
     */
    getRandom: (limit = 10, exclude_id) => {
      return request({
        url: "/products/random",
        method: "GET",
        params: {
          limit,
          exclude_id,
        },
      });
    },
    getById: (id) => {
      return request({
        url: `/products/${id}`,
        method: "GET",
      });
    },
  },
  admin: {
    create: (
      name,
      sku,
      categoryId,
      description,
      price,
      stock,
      variants,
      isPublished,
      isNew,
      images,
    ) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("variants", JSON.stringify(variants));
      formData.append("is_published", isPublished);
      formData.append("is_new", isNew);
      images.forEach((image) => {
        formData.append("images", image);
      });

      return request({
        url: "/products",
        method: "POST",
        data: formData,
      });
    },
    update: (
      id,
      name,
      sku,
      categoryId,
      description,
      price,
      stock,
      variants,
      isPublished,
      isNew,
      images,
    ) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("variants", JSON.stringify(variants));
      formData.append("is_published", isPublished);
      formData.append("is_new", isNew);
      images.forEach((image) => {
        formData.append("images", image);
      });

      return request({
        url: `/products/${id}`,
        method: "PUT",
        data: formData,
      });
    },
    delete: (id) => {
      return request({
        url: `/products/${id}`,
        method: "DELETE",
      });
    },
    /**
     * Toggle publish a product
     * @param {string} id
     * @param {boolean} status - true for active, false for inactive
     */
    togglePublish: (id, status) => {
      return request({
        url: `/products/${id}/toggle-publish`,
        method: "PATCH",
        params: {
          status,
        },
      });
    },
    /**
     * Bulk toggle publish products
     * @param {string[]} ids
     * @param {boolean} status - true for active, false for inactive
     */
    bulkTogglePublish: (ids, status) => {
      return request({
        url: `/products/bulk/toggle-publish`,
        method: "PATCH",
        data: {
          ids,
          status,
        },
      });
    },
    /**
     * Bulk delete products
     * @param {string[]} ids
     */
    bulkDelete: (ids) => {
      return request({
        url: `/products/bulk/delete`,
        method: "DELETE",
        data: {
          ids,
        },
      });
    },
    uploadImages: (id, images) => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("product_id", id);

      return request({
        url: `/products/images/upload`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
    },
    setPrimaryImage: (id, imageId) => {
      return request({
        url: `/products/${id}/images/primary`,
        method: "PATCH",
        data: {
          image_id: imageId,
        },
      });
    },
    deleteImage: (imageId) => {
      return request({
        url: `/products/images/${imageId}`,
        method: "DELETE",
      });
    },
    /**
     * Sort product images
     * @param {string} id
     * @param {string[]} imageIds
     */
    sortImage: (id, imageIds) => {
      const data = {
        image_orders: [],
      };
      imageIds.forEach((id, index) => {
        data.image_orders.push({ image_id: id, sort_order: index + 1 });
      });
      return request({
        url: `/products/${id}/images/sort-orders`,
        method: "PATCH",
        data,
      });
    },
  },
};
