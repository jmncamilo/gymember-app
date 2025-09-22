const baseValidation = (data, type, regex) => {
    if (!data || typeof data !== type) return false;
    return regex.test(data);
}

const validateEmail = data => {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return baseValidation(data, 'string', regex);
}

const validateNuip = data => {
    const regex = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))$/m;
    return baseValidation(data, 'string', regex);
}

module.exports = {
    validateEmail,
    validateNuip
};