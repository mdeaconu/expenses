/**
 * @param {Date} date
 * @returns {string} the formatted date
 */
export function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()}`;
}

/**
 * @param {Date} date
 * @param {number} days
 * @returns {Date} the new date back in the past
 */
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
