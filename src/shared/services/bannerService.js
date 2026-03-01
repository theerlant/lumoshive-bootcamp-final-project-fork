import { request } from "./client";

export const bannerService = {
  public: {
    /**
     * Get all active banners
     */
    getActives: () => {
      return request({
        url: "/banners/active",
        method: "GET",
      });
    },
    /**
     * Get banner by position
     * @param {string} position - 'home' | 'category' | 'promo'
     */
    getByPosition: (position = "home") => {
      return request({
        url: `/banners/position/${position}`,
        method: "GET",
      });
    },
  },
  admin: {
    /**
     * Get all banners
     */
    getAll: () => {
      return request({
        url: "/banners",
        method: "GET",
      });
    },
    /**
     * Get banner by id
     * @param {string} id - banner id
     */
    getById: (id) => {
      return request({
        url: `/banners/${id}`,
        method: "GET",
      });
    },
    /**
     * Create banner
     * @param {string} name - banner name (required)
     * @param {string} image - banner image (required)
     * @param {string} target_url - banner target url (max 500)
     * @param {string} title - banner title (max 255)
     * @param {string} subtitle - banner subtitle (max 500)
     * @param {string} startDate - banner start date (RFC3339)
     * @param {string} endDate - banner end date (RFC3339)
     * @param {number} order - banner order
     * @param {boolean} isPublished - banner is published
     * @param {string} position - banner position: 'home' | 'category' | 'promo'
     */
    create: (
      name,
      image,
      targetUrl,
      title,
      subtitle,
      startDate,
      endDate,
      order,
      isPublished,
      position = "home",
    ) => {
      return request({
        url: "/banners",
        method: "POST",
        data: {
          name,
          image,
          target_url: targetUrl,
          title,
          subtitle,
          start_date: startDate,
          end_date: endDate,
          order,
          is_published: isPublished,
          position,
        },
      });
    },
    /**
     * Update banner
     * @param {string} id - banner id
     * @param {string} name - banner name (required)
     * @param {string} image - banner image (required)
     * @param {string} target_url - banner target url (max 500)
     * @param {string} title - banner title (max 255)
     * @param {string} subtitle - banner subtitle (max 500)
     * @param {string} startDate - banner start date (RFC3339) (NOTE: Gunakan utils toBackendDate)
     * @param {string} endDate - banner end date (RFC3339) (NOTE: Gunakan utils toBackendDate)
     * @param {number} order - banner order
     * @param {boolean} isPublished - banner is published
     * @param {string} position - banner position: 'home' | 'category' | 'promo'
     */
    update: (
      id,
      name,
      image,
      targetUrl,
      title,
      subtitle,
      startDate,
      endDate,
      order,
      isPublished,
      position = "home",
    ) => {
      return request({
        url: `/banners/${id}`,
        method: "PUT",
        data: {
          name,
          image,
          target_url: targetUrl,
          title,
          subtitle,
          start_date: startDate,
          end_date: endDate,
          order,
          is_published: isPublished,
          position,
        },
      });
    },
    /**
     * Delete banner
     * @param {string} id - banner id
     */
    delete: (id) => {
      return request({
        url: `/banners/${id}`,
        method: "DELETE",
      });
    },
  },
  /**
   * Update banner order
   * @param {string[]} ids - banner ids sorted
   */
  updateOrder: (ids = []) => {
    return request({
      url: "/banners/order",
      method: "PUT",
      data: {
        banner_ids: ids,
      },
    });
  },
  /**
   * Toggle banner publish
   * @param {string} id - banner id
   */
  togglePublish: (id) => {
    return request({
      url: `/banners/${id}/toggle-publish`,
      method: "PATCH",
    });
  },
};
