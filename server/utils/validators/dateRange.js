// Checks whether a given ISO date is within the last N days from now
function isDateWithinLastDays(sourceDate, days) {
    // Basic validations
    if (!sourceDate || typeof days !== 'number' || days < 0) return false;


    const targetTimestamp = new Date(sourceDate).getTime();

    // Invalid date check (NaN)
    if (Number.isNaN(targetTimestamp)) return false;

    const now = Date.now();
    const fromTimestamp = now - days * 24 * 60 * 60 * 1000;

    return targetTimestamp >= fromTimestamp && targetTimestamp <= now;
}

module.exports = isDateWithinLastDays;