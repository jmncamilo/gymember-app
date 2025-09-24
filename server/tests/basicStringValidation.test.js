const { validateBasicString } = require('../utils/validators/validators.js');

describe('different cases of strings validation', () => {
    test('like basic address', () => {
        expect(validateBasicString('Cra 1A 25# 5C-04 Los Hills')).toBe(true);
    });

    test('valid name', () => {
        expect(validateBasicString('Camilo')).toBe(true);
    });

    test('valid surname', () => {
        expect(validateBasicString('Jiménez')).toBe(true);
    });

    test('valid city', () => {
        expect(validateBasicString('Medellín')).toBe(true);
    });

    test('name with spaces', () => {
        expect(validateBasicString(' Ana ')).toBe(true);
    });

    test('single character string', () => {
        expect(validateBasicString('A')).toBe(false);
    });

    test('empty string', () => {
        expect(validateBasicString('')).toBe(false);
    });

    test('string with only spaces', () => {
        expect(validateBasicString('   ')).toBe(false);
    });

    test('null value', () => {
        expect(validateBasicString(null)).toBe(false);
    });

    test('undefined value', () => {
        expect(validateBasicString(undefined)).toBe(false);
    });

    test('numeric value', () => {
        expect(validateBasicString(123)).toBe(false);
    });

    test('true boolean value', () => {
        expect(validateBasicString(true)).toBe(false);
    });

});