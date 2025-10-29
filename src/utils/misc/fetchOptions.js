export const optionsWithBody = (body, method, headers = {}) => ({
    method: method,
    body: JSON.stringify(body),
    headers: headers
});

export const deleteOptions = {
    method: "DELETE"
};