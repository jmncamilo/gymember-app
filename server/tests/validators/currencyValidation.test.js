const { validateCurrency } = require('../../utils/validators/validators');

describe('currency validation', () => {
    test('of standard colombian currency', () => {
        expect(validateCurrency('80000.00')).toBe(true);
    });

    test('of standard colombian currency with spaces', () => {
        expect(validateCurrency(' 80000.00')).toBe(false);
    });

    test('of number type', () => {
        expect(validateCurrency(50000)).toBe(false);
    });

    test('of boolean type', () => {
        expect(validateCurrency(false)).toBe(false);
    });

    test('of string with letters', () => {
        expect(validateCurrency('25.00fdf')).toBe(false);
    });

    test('of string conformed by only words', () => {
        expect(validateCurrency('jmncamilo')).toBe(false);
    });

    test('of empty string value', () => {
        expect(validateCurrency('')).toBe(false);
    });

    test('of string with only a dot', () => {
        expect(validateCurrency('.')).toBe(false);
    });

    test('of string with multiple dots', () => {
        expect(validateCurrency('12.34.56')).toBe(false);
    });

    test('of string with leading zeros', () => {
        expect(validateCurrency('000123.45')).toBe(true);
    });

    test('of string with only decimals', () => {
        expect(validateCurrency('.99')).toBe(true);
    });
});