/**
 * @param {Date} date
 * @returns {string} the formatted date
 */
export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * @param {Date} date
 * @param {number} days
 * @returns {Date} the new date back in the past
 */
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
