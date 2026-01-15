export function formatColombianCurrency(value) {
    const number = parseInt(value, 10);
    if (isNaN(number)) return '--';
    return number.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}