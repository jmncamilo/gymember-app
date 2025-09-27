const { validateNit } = require('../../utils/validators/validators');

describe('nit validation', () => {
    test('of standard colombian nit with verification digit', () => {
        expect(validateNit('123456789-2')).toBe(true);
    });

    test('of standard colombian nit without verification digit', () => {
        expect(validateNit('930070527')).toBe(false);
    });

    test('with rare spaces', () => {
        expect(validateNit('90 902585')).toBe(false);
    });

    test('with letters', () => {
        expect(validateNit('90A902598')).toBe(false);
    });

    test('with 10 chars', () => {
        expect(validateNit('1234567890')).toBe(false);
    });

    test('with 8 chars', () => {
        expect(validateNit('12345678')).toBe(false);
    });

    test('with verification digit empty', () => {
        expect(validateNit('123456789-')).toBe(false);
    });

    test('with verification digit with space', () => {
        expect(validateNit('123456789- ')).toBe(false);
    });

    test('with type of array', () => {
        expect(validateNit([])).toBe(false);
    });

    test('with empty string', () => {
        expect(validateNit('')).toBe(false);
    });

    test('with type of float', () => {
        expect(validateNit(90951025.2)).toBe(false);
    });
});