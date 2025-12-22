// Validates input object (must be the argument type). Ensures mandatory data is not empty...
export const checkRequestData = obj => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const fieldsValue = Object.values(obj);
    return fieldsValue.every(field => field !== "" && field != null);
};

// Validates that specified keys in an object contain non-empty string values
export const validateRequiredFields = (obj = {}, keysToValidate = []) => {
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

// Normalizes selected object fields by converting their values to strings
export const normalizeObjectFields = (obj = {}, keysToNormalize = []) => {
    if (
        !obj ||
        typeof obj !== 'object' ||
        !Array.isArray(keysToNormalize) ||
        keysToNormalize.length === 0
    ) {
        return false;
    }

    // Build a map of normalized fields converted to strings
    const normalizedFields = keysToNormalize.reduce((acc, key) => {
        acc[key] = String(obj?.[key]);
        return acc;
    }, {});

    // Merge normalized fields back into the original object
    return {
        ...obj,
        ...normalizedFields
    };
};