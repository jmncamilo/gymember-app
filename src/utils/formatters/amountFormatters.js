export function formatCurrency(value) {
    if (isNaN(value) || value === '' || value < 0) return '';

    return new Intl.NumberFormat("es-CO", {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 2
    }).format(value);
}

export function removeCurrencyFormat(value) {
    if (value === '' || value === undefined || value === null) return '';

    return value
        .replace(/[^\d.,]/g, '')
        .replace(/,/, '.')
        .replace(/\.(?=.*\.)/g, '');
}
