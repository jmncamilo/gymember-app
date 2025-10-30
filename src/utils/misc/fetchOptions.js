export const optionsWithBody = (body, method, headers = {}) => ({
    method: method,
    body: JSON.stringify(body),
    headers: headers
});

export const deleteOptions = {
    method: "DELETE"
};

export const getOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
    credentials: "include",
};