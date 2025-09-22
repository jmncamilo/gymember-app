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

// TODO: crear validador para cadenas permisivas (ciudad, nombre, apellidos, dirección), donde pase todo, pero que haya un mínimo de longitud y de tipo string
// TODO: crear validador para la edad, ya que el formatter va a tener problemas si es NaN

module.exports = {
    validateEmail,
    validateNuip,
    validateNit,
    validatePhoneNumber
};