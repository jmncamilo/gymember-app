// Formats an ISO date string to YYYY-MM-DD for HTML date inputs
export function formatDateForDateInput(isoDate) {
    return isoDate ? isoDate.split("T")[0] : '';
}