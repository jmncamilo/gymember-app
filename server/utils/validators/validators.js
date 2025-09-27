const baseValidation = (data, type, regex) => {
    if (!data || typeof data !== type) return false;
    return regex.test(data);
};

const validateEmail = data => {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return baseValidation(data, 'string', regex);
};

const validateNuip = data => {
    const regex = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))$/m;
    return baseValidation(data, 'string', regex);
};

const validateNit = data => {
    const regex = /^\d{9}-\d$/;
    return baseValidation(data, 'string', regex);
};

const validatePhoneNumber = data => {
    const regex = /^3\d{9}$/;
    return baseValidation(data, 'string', regex);
};

const validateAge = data => {
    const regex = /^(?:[1-9]|[1-9][0-9]|1[0-2][0-9]|130)$/;
    return baseValidation(data, 'string', regex);
};

const validateBasicString = data => {
    if (!data) return false;
    return typeof data === 'string' && data.trim().length >= 2;
};

const validateCurrency = data => {
    const regex = /^(?:\d+|\d*\.\d+)$/;
    return baseValidation(data, 'string', regex);
};

module.exports = {
    validateEmail,
    validateNuip,
    validateNit,
    validatePhoneNumber,
    validateAge,
    validateBasicString,
    validateCurrency
};