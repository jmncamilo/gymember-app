const { fieldTranslations } = require("../formatters/fieldTranslations.js");
const {
    validateEmail,
    validateNuip,
    validateNit,
    validatePhoneNumber,
    validateAge,
    validateBasicString,
    validateCurrency,
    validateReasonableNumber,
    validateDate
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
    plain_pass: validateBasicString,
    first_name: validateBasicString,
    first_last_name: validateBasicString,
    address: validateBasicString,
    city: validateBasicString,
    emergency_phone: validatePhoneNumber,
    additional_info: validateBasicString,
    membership_type: validateBasicString,
    duration_days: validateReasonableNumber,
    start_date: validateDate,
    end_date: validateDate,
    birthdate: validateDate
};

// Validator function for a single field ('type' is the same thing that key)
const validateField = (value, type = 'string') => {
    const result = validatorsList[type](value);

    if(!result) return { success: false, message: `El campo ${fieldTranslations[type]} no cumple con las condiciones.` };

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