// Validates input object (must be the argument type). Ensures mandatory data is not empty...
export const checkRequestData = obj => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const fieldsValue = Object.values(obj);
    return fieldsValue.every(field => field !== "" && field != null);
};

// Validates that specified keys in an object contain non-empty string values
export const isValidRequest = (obj = {}, keysToValidate = []) => {
    if (
        !obj ||
        typeof obj !== 'object' ||
        !Array.isArray(keysToValidate) ||
        keysToValidate.length === 0
    ) return false;

    // Iterate through the required keys to check for empty values
    const hasEmptyValues = keysToValidate.some(key => !obj?.[key]?.trim());
    return !hasEmptyValues;
};