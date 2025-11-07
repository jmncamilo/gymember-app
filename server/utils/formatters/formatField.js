const {
    intParser,
    floatCurrencyParser,
    formatText,
    trimTextOnly,
    toLowerCaseText
} = require("./formatters.js");

const formattersList = {
    age: intParser,
    gym_id_fk: intParser,
    role: toLowerCaseText,
    enrolling_employee_id_fk: intParser,
    customer_id_fk: intParser,
    gender: toLowerCaseText,
    duration_days: intParser,
    amount: floatCurrencyParser,
    trimString: trimTextOnly,
    email: toLowerCaseText,
    city: formatText,
    additional_info: formatText,
    membership_type: formatText,
    description: formatText
};

const formatBody = originalObjBody => {
    let formatter;
    let modifiedObjBody = { ...originalObjBody };
    const bodyKeys = Object.keys(modifiedObjBody);

    for (const key of bodyKeys) {
        if (key in formattersList) {
            formatter = formattersList[key];
            modifiedObjBody[key] = formatter(modifiedObjBody[key]);
        } else {
            formatter = formattersList.trimString;
            modifiedObjBody[key] = formatter(modifiedObjBody[key]);
        }
    }

    return modifiedObjBody;
};

module.exports = {
    formatBody
};