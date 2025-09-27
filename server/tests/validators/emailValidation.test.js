const { validateEmail } = require('../../utils/validators/validators.js');

describe('email validation', () => {
    test('of normal email', () => {
        expect(validateEmail('jmncamilo@gmail.com')).toBe(true);
    });

    test('of empty string', () => {
        expect(validateEmail('')).toBe(false);
    });

    test('of rare domain', () => {
        expect(validateEmail('jmncamilo@gmail.comsvgs')).toBe(false);
    });

    test('of rare space at start', () => {
        expect(validateEmail(' jmncamilo@gmail.com')).toBe(false);
    });

    test('of rare space at the end', () => {
        expect(validateEmail('jmncamilo@gmail.com ')).toBe(false);
    });

    test('of rare space between domain', () => {
        expect(validateEmail('jmncamilo@gmail. com ')).toBe(false);
    });

    test('of combined domain', () => {
        expect(validateEmail('jmncamilo@gmail.edu.co')).toBe(true);
    });

    test('of invalids characters and space at the final string', () => {
        expect(validateEmail('jmncamil+_%ogmail.edu.co ')).toBe(false);
    });

    test('of just numbers', () => {
        expect(validateEmail('4534534')).toBe(false);
    });

    test('of email with another dot', () => {
        expect(validateEmail('juan.camilo@gmail.com')).toBe(true);
    });

    test('with comma at the end', () => {
        expect(validateEmail('juan.camilo@gmail.com,')).toBe(false);
    });

    test('with dot at start', () => {
        expect(validateEmail('.juan.camilo@gmail.com')).toBe(false);
    });

    test('of email in upper case', () => {
        expect(validateEmail('juan.cAMILo@gmail.com')).toBe(true);
    });

    test('of some special chars', () => {
        expect(validateEmail('juan-cAMI0_Lo@gmail.com')).toBe(true);
    });

    test('with slash at the end', () => {
        expect(validateEmail('/juan-cAMI0_Lo@gmail.com')).toBe(false);
    });

    test('with type of int', () => {
        expect(validateEmail(232311)).toBe(false);
    });

    test('with type of array', () => {
        expect(validateEmail([])).toBe(false);
    });
});