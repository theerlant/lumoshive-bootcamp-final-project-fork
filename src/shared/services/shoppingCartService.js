import { request } from "./client";

const shoppingCartService = {
  get: () => {
    return request({
      url: "/cart",
      method: "GET",
    });
  },
  /**
   * Add a product to the cart (if exists, add quantity)
   * @param {string} productId
   * @param {number} quantity (must be > 0)
   * @returns
   */
  addItem: (productId, quantity = 1) => {
    return request({
      url: "/cart",
      method: "POST",
      data: {
        product_id: productId,
        quantity,
      },
    });
  },
  /**
   * Update quantity of a product in the cart
   * @param {string} productId
   * @param {number} quantity (must be > 0)
   * @returns
   */
  updateItem: (productId, quantity) => {
    return request({
      url: `/cart/${productId}`,
      method: "PUT",
      data: {
        quantity,
      },
    });
  },
  /**
   * Remove a product from the cart
   * @param {string} productId
   */
  removeItem: (productId) => {
    return request({
      url: `/cart/${productId}`,
      method: "DELETE",
    });
  },
};

export default shoppingCartService;
