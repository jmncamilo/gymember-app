const {
    validateEmail,
    validateNuip,
    validateNit,
    validatePhoneNumber,
    validateAge,
    validateBasicString,
    validateCurrency
} = require('./validators.js');

// Dictionary mapping field types to its corresponding validators
const validatorsList = {
    email: validateEmail,
    nuip: validateNuip,
    nit: validateNit,
    phone_number: validatePhoneNumber,
    age: validateAge,
    string: validateBasicString,
    amount: validateCurrency
};

const validateField = (value, type = 'string') => {
    return validatorsList[type](value);
};

module.exports = validateField;

// TODO: same thing with formatters...