import { request } from "./client";

export const UserService = {
  /**
   * Get user profile
   */
  get: () => {
    return request({
      url: "/users/profile",
      method: "GET",
    });
  },
  /**
   * Update user profile
   * @param {string} [fullName] fullname to change
   * @param {string} [phone] phone to change
   * @param {*} [avatar] avatar file to change
   */
  update: (data) => {
    return request({
      url: "/users/profile",
      method: "PUT",
      data: data,
    });
  },
  /**
   * Change user password
   * @param {string} currentPassword current password
   * @param {string} newPassword new password
   */
  changePassword: (currentPassword, newPassword) => {
    return request({
      url: "/users/change-password",
      method: "POST",
      data: {
        current_password: currentPassword,
        new_password: newPassword,
      },
    });
  },
};

export const AdminUserService = {
  /**
   *
   * @param {number} [page] page number
   * @param {number} [limit] items per page
   * @param {string} [search] search by email
   * @param {string} [role] role filter: 'customer' | 'admin' | 'staff'
   * @param {string} [status] status filter: 'active' | 'inactive'
   * @param {string} [sortBy] sort filter: 'email' | 'created_at' | 'updated_at'
   * @param {string} [sortOrder] sort order: 'asc' | 'desc'
   */
  getAllUsers: (
    page = 1,
    limit = 10,
    search = "",
    role = "",
    status = "",
    sortBy = "created_at",
    sortOrder = "desc",
  ) => {
    return request({
      url: "/users/admin/users",
      method: "GET",
      params: {
        page,
        limit,
        search,
        role,
        status,
        sort_by: sortBy,
        sort_order: sortOrder,
      },
    });
  },
  /**
   *
   * @param {string} id - UUID to get (required)
   */
  getUserById: (id) => {
    return request({
      url: `/users/admin/users/${id}`,
      method: "GET",
    });
  },
  /**
   *
   * @param {string} id UUID to update (required)
   * @param {string} [email] new email
   * @param {string} [password] new password
   * @param {string} [role] user role 'customer' | 'admin' | 'staff'
   * @param {string} [status] 'active' | 'inactive'
   */
  updateUser: (id, email, password, role, status) => {
    const updateData = {};
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    return request({
      url: `/users/admin/users/${id}`,
      method: "POST",
      data: updateData,
    });
  },
  deleteUser: (id) => {
    return request({
      url: `/users/admin/users/${id}`,
      method: "DELETE",
    });
  },
};
