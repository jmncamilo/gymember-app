// This file contains numeric validation utilities, regardless of whether the input values come as strings or numbers...

export function validateGrantedDays(value) {
    if (value === '' || value === null || value === undefined) return 0;
    const num = Number(value);

    if (Number.isNaN(num)) return 0;

    return num >= 0 && num <= 999 ? num : 0;
}
