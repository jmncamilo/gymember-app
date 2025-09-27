const { floatCurrencyParser, intParser, formatText } = require('../../utils/formatters/formatters');

describe('testing formatters functions', () => {
    // Formatting currency
    test('like standard currency', () => {
        expect(floatCurrencyParser('50000.2523')).toBe(50000.25);
    });

    test('like currency with zeros like decimals', () => {
        expect(floatCurrencyParser('50000.00')).toBe(50000.00);
    });

    test('parsing standard currency string with decimals', () => {
        expect(floatCurrencyParser('50000.25')).toBe(50000.25);
    });

    test('parsing currency string with leading/trailing spaces', () => {
        expect(floatCurrencyParser(' 12345.99 ')).toBe(12345.99);
    });

    test('parsing currency string with only integer part', () => {
        expect(floatCurrencyParser('80000')).toBe(80000);
    });

    test('parsing currency string with leading zeros', () => {
        expect(floatCurrencyParser('000123.45')).toBe(123.45);
    });

    test('parsing currency string with only decimals', () => {
        expect(floatCurrencyParser('.99')).toBe(0.99);
    });

    // Formatting integer
    test('like normal integer', () => {
        expect(intParser('100')).toBe(100);
    });

    test('like integer with spaces', () => {
        expect(intParser(' 100 ')).toBe(100);
    });

    test('like integer with some letters at the end', () => {
        expect(intParser('123abc')).toBe(123);
    });

    // Formatting strings
    test('like string formatter', () => {
        expect(formatText('  hola')).toBe('Hola');
    });

    test('formats a lowercase word', () => {
        expect(formatText('hola')).toBe('Hola');
    });

    test('formats an already capitalized word', () => {
        expect(formatText('Hola')).toBe('Hola');
    });

    test('formats a word with trailing and leading spaces', () => {
        expect(formatText('  hola  ')).toBe('Hola');
    });

    test('formats a single letter', () => {
        expect(formatText('a')).toBe('A');
    });

    test('formats a word with all uppercase', () => {
        expect(formatText('HOLA')).toBe('HOLA');
    });

    test('formats a word with mixed case', () => {
        expect(formatText('hOlA')).toBe('HOlA');
    });

    test('formats a string with multiple words', () => {
        expect(formatText('hola mundo')).toBe('Hola mundo');
    });
});