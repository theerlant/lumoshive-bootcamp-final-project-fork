import { request } from "./client";

export const addressService = {
  /**
   * Add new address to user (All param is required except isDefault)
   * @param {string} label address label
   * @param {string} recipientName recipient name
   * @param {string} phone phone number
   * @param {string} addressLine address line
   * @param {string} city city
   * @param {string} province province
   * @param {string} postalCode postal code
   * @param {boolean} isDefault is default (default is false)
   */
  addAddress: (
    label,
    recipientName,
    phone,
    addressLine,
    city,
    province,
    postalCode,
    isDefault = false,
  ) => {
    return request({
      url: "/address",
      method: "POST",
      data: {
        label,
        recipient_name: recipientName,
        phone,
        address_line: addressLine,
        city,
        province,
        postal_code: postalCode,
        is_default: isDefault,
      },
    });
  },

  getAll: () => {
    return request({
      url: "/address",
      method: "GET",
    });
  },

  getById: (id) => {
    return request({
      url: `/address/${id}`,
      method: "GET",
    });
  },

  updateAddress: (
    id,
    label,
    recipientName,
    phone,
    addressLine,
    city,
    province,
    postalCode,
    isDefault = false,
  ) => {
    return request({
      url: `/address/${id}`,
      method: "PUT",
      data: {
        label,
        recipient_name: recipientName,
        phone,
        address_line: addressLine,
        city,
        province,
        postal_code: postalCode,
        is_default: isDefault,
      },
    });
  },

  setAsDefault: (id) => {
    return request({
      url: `/address/${id}/default`,
      method: "PUT",
    });
  },

  deleteAddress: (id) => {
    return request({
      url: `/address/${id}`,
      method: "DELETE",
    });
  },
};
