// Returns the first word from a given string. If the input is not a string, it returns the input as is
export function getFirstWord(str) {
    if(typeof str !== 'string') return str;
    return str.trim().split(' ')[0];
}