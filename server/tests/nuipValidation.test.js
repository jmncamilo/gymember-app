const { validateNuip } = require('../utils/validators/validators');

describe('nuip validation', () => {
    test('of standard colombian dni called nuip', () => {
        expect(validateNuip('40441835')).toBe(true);
    });

    test('of another standard colombian dni called nuip', () => {
        expect(validateNuip('1122652725')).toBe(true);
    });

    test('of different type of string', () => {
        expect(validateNuip(40441835)).toBe(false);
    });

    test('of empty string', () => {
        expect(validateNuip('')).toBe(false);
    });

    test('of nuip with some spaces', () => {
        expect(validateNuip('40 441 835')).toBe(false);
    });

    test('of nuip with rare characters', () => {
        expect(validateNuip('40$414&/25')).toBe(false);
    });

    test('of nuip with another rare characters', () => {
        expect(validateNuip('-----250')).toBe(false);
    });

    test('of nuip with object type', () => {
        expect(validateNuip({})).toBe(false);
    });

    test('of very long string', () => {
        expect(validateNuip('2523252325232523')).toBe(false);
    });

    test('of string with eleven chars', () => {
        expect(validateNuip('2523252325232523')).toBe(false);
    });
});