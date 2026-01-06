/*
 * Converts a date string from YYYY-MM-DD to DD/MM/YYYY.
 * If the input is invalid, it returns the original value to avoid breaking the UI.
 */
export function formatDateToDayFirst(dateString) {
    if (typeof dateString !== 'string') return dateString;

    // Expected format: YYYY-MM-DD
    const parts = dateString.split('-');

    if (parts.length !== 3) return dateString;

    const [year, month, day] = parts;

    // Basic sanity checks
    if (
        year.length !== 4 ||
        month.length !== 2 ||
        day.length !== 2
    ) return dateString;

    return `${day}/${month}/${year}`;
}