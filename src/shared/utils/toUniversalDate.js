/**
 * Convert date to universal format (YYYY-MM-DD)
 * @param {Date} date - Date to convert
 * @returns {string} - Date in universal format
 */
export const toUniversalDate = (date) =>
  date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : "";
