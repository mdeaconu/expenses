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

/**
 * @param {string} dateString
 * @returns {Boolean} Returns `true` if date is valid else `false`
 */
export function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
