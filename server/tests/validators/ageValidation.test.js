const { validateAge } = require('../../utils/validators/validators.js');

describe('age validation', () => {
    test('of valid string age', () => {
        expect(validateAge('23')).toBe(true);
    });

    test('of type int', () => {
        expect(validateAge(23)).toBe(false);
    });

    test('minimum allowed age', () => {
        expect(validateAge('1')).toBe(true);
    });

    test('maximum allowed age', () => {
        expect(validateAge('130')).toBe(true);
    });

    test('age less than 1', () => {
        expect(validateAge('0')).toBe(false);
    });

    test('age mora than 130', () => {
        expect(validateAge('131')).toBe(false);
    });

    test('age with zero to the left', () => {
        expect(validateAge('01')).toBe(false);
    });

    test('age like empty string', () => {
        expect(validateAge('')).toBe(false);
    });

    test('age like null', () => {
        expect(validateAge(null)).toBe(false);
    });

    test('age like string not number', () => {
        expect(validateAge('abc')).toBe(false);
    });
});