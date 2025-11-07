const intParser = data => {
    return parseInt(data, 10);
};

const floatCurrencyParser = data => {
    return Number(parseFloat(data).toFixed(2));
};

const formatText = data => {
    return data.trim().charAt(0).toUpperCase() + data.trim().slice(1);
};

const trimTextOnly = data => {
    return data.trim();
};

const toLowerCaseText = data => {
    return data.trim().toLowerCase();
};

const capitalizeText = data => {
    return data.trim()
        .replace(/\b\w/g, char => char.toUpperCase())
        .replace(/\B\w/g, char => char.toLowerCase());
};

module.exports = {
    intParser,
    floatCurrencyParser,
    formatText,
    trimTextOnly,
    toLowerCaseText,
    capitalizeText
};