const intParser = data => {
    return parseInt(data, 10);
};

const floatCurrencyParser = data => {
    return Number(parseFloat(data).toFixed(2));
};

const formatText = data => {
    return data.trim().charAt(0).toUpperCase() + data.trim().slice(1);
};

module.exports = {
    intParser,
    floatCurrencyParser,
    formatText
}