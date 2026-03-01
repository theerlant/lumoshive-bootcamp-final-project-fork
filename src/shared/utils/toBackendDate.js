/**
 * Convert Date to backend format (YYYY-MM-DDTHH:mm:ssZ)
 * Input: JS Date (ISO 8601: 2026-02-24T13:51:00.000Z)
 * Output: String (RFC 3339: 2026-02-24T13:51:00Z)
 * @param {Date} date - Date to convert
 * @returns {string} - Converted date
 */
export const toBackendDate = (date) => {
  return `${date.toISOString().split(".")[0]}Z`;
};
