export function calcEndDate(startDate, durationDays = '0') {

    let date = startDate ? new Date(startDate) : new Date();
    let days = parseInt(durationDays) || 0;

    date.setDate(date.getDate() + days);

    return date.toISOString().slice(0, 10);

}