export function calcAge(bornDate) {
    if (!bornDate || !/^\d{4}-\d{2}-\d{2}$/.test(bornDate)) return '';

    const nowTimestamp = Date.now();
    const birthdayTimestamp = new Date(bornDate).getTime();

    if (isNaN(birthdayTimestamp)) return '';

    const age = Math.floor((nowTimestamp - birthdayTimestamp) / (365.25 * 24 * 60 * 60 * 1000));

    return (age >= 7 && age <= 100) ? age : '';
}