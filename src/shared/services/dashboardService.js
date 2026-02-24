import { request } from "./client";

export const dashboardService = {
  /**
   * Get summary data for dashboard
   * @returns - total_orders, total_sales, total_items_sold
   */
  getSummary: () => {
    return request({
      url: "/admin/dashboard/summary",
      method: "GET",
    });
  },
  /**
   * Get earning for the current month
   */
  getMonthlyEarning: () => {
    return request({
      url: "/admin/dashboard/monthly-earning",
      method: "GET",
    });
  },
  /**
   * Get revenue chart data
   * @param {number} year - Year to get revenue chart data (optional)
   * @returns
   */
  getRevenueChart: (year) => {
    return request({
      url: "/admin/dashboard/revenue-chart",
      method: "GET",
      params: {
        year,
      },
    });
  },
  getTopSelling: (limit = 5) => {
    return request({
      url: "/admin/dashboard/top-products",
      method: "GET",
      params: {
        limit,
      },
    });
  },
};
