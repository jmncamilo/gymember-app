// Validates input object (must be the argument type). Ensures mandatory data is not empty...
export const checkRequestData = obj => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    const fieldsValue = Object.values(obj);
    return fieldsValue.every(field => field !== "" && field != null);
};