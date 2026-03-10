import { request } from "./client";

export const categoryService = {
  public: {
    getAll: ({ page, limit, search, published, sort_by, sort_order }) => {
      return request({
        url: "/categories",
        method: "GET",
        params: {
          page,
          limit,
          search,
          published,
          sort_by,
          sort_order,
        },
      });
    },
    getForDropdown: () => {
      return request({
        url: "/categories/select",
        method: "GET",
      });
    },
    getById: (id) => {
      return request({
        url: `/categories/${id}`,
        method: "GET",
      });
    },
  },
  admin: {
    create: (name, isPublished, icon) => {
      return request({
        url: "/categories",
        method: "POST",
        data: {
          name,
          is_published: isPublished,
          icon,
        },
      });
    },
    /**
     * Update category
     * @param {string} id - Category ID
     * @param {string} name - Category name
     * @param {boolean} isPublished - Whether category is published
     * @param {File} icon - Category icon
     * @param {boolean} removeIcon - Whether to remove category icon or not (?)
     * @returns
     */
    update: (id, name, isPublished, icon, removeIcon = false) => {
      return request({
        url: `/categories/${id}`,
        method: "PUT",
        data: {
          name,
          is_published: isPublished,
          icon,
          remove_icon: removeIcon,
        },
      });
    },
    delete: (id) => {
      return request({
        url: `/categories/${id}`,
        method: "DELETE",
      });
    },
    togglePublish: (id) => {
      return request({
        url: `/categories/${id}/toggle-publish`,
        method: "PATCH",
      });
    },
  },
};
