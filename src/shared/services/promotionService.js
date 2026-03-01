import { request } from "./client";

const promotionService = {
  public: {
    get: (
      page = 1,
      limit = 10,
      search,
      discountType,
      isActive,
      sortBy,
      sortOrder,
    ) => {
      return request({
        url: `/promotions`,
        method: "GET",
        params: {
          page,
          limit,
          search,
          discount_type: discountType,
          is_active: isActive,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
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
    create: () => {},
    update: () => {},
    delete: (id) => {},
    toggleStatus: (id) => {},
  },
};
