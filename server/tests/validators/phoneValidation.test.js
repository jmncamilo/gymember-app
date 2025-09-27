const { validatePhoneNumber } = require("../../utils/validators/validators");

describe('nit validation', () => {
    test('of standard colombian phone number', () => {
        expect(validatePhoneNumber('3102108511')).toBe(true);
    });

    test('of 11 digits', () => {
        expect(validatePhoneNumber('31021085111')).toBe(false);
    });

    test('with less than 10 digits', () => {
        expect(validatePhoneNumber('310210851')).toBe(false);
    });

    test('not starting with 3', () => {
        expect(validatePhoneNumber('2102108511')).toBe(false);
    });

    test('with letters', () => {
        expect(validatePhoneNumber('31021P8511')).toBe(false);
    });

    test('with special characters', () => {
        expect(validatePhoneNumber('31021-8511')).toBe(false);
    });

    test('with rate spaces', () => {
        expect(validatePhoneNumber('310 2108511')).toBe(false);
    });

    test('with falsy value null', () => {
        expect(validatePhoneNumber(null)).toBe(false);
    });

    test('with falsy value undefined', () => {
        expect(validatePhoneNumber(undefined)).toBe(false);
    });

    test('with empty string', () => {
        expect(validatePhoneNumber('')).toBe(false);
    });

    test('with int type', () => {
        expect(validatePhoneNumber(3102108511)).toBe(false);
    });
});