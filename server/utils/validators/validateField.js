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
    amount: validateCurrency,
    hash_pass: validateBasicString,
    plain_pass: validateBasicString
};

// Validator function for a single field ('type' is the same thing that key)
const validateField = (value, type = 'string') => {
    const result = validatorsList[type](value);

    if(!result) return { success: false, message: `El campo ${type} no cumple con las condiciones.` };

    return { success: true };
};

// Iterates over all fields of body and validates them
const validateBody = body => {
    let errors = {};
    let isSuccess = true;
    const validators = Object.keys(validatorsList); // Get array with available validators

    for(const [key, value] of Object.entries(body)) {
        if (!validators.includes(key)) continue; // Only validate what is on the validator list

        const result = validateField(value, key);
        if (!result.success) {
            errors[key] = result.message;
            isSuccess = false;
        }
    }

    return isSuccess === true ? { isSuccess } : {isSuccess, errors};
};

module.exports = { validateField, validateBody };

// TODO: same thing with formatters...