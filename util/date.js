/**
 * @param {Date} date
 * @returns {string} the formatted date
 */
export function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() - 1}-${date.getDate()}`;
}
