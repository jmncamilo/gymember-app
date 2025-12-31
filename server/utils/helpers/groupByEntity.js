/*
 * Groups the properties of a source object according to an entity mapping.
 * Assumes all keys in source exist in entityMap and values are pre-validated.
 * Returns null if validation fails or resulting object is empty.
 */
function groupByEntity(source, entityMap) {
    // Basic validation: source must be a non-empty object
    if (
        typeof source !== 'object' ||
        source === null ||
        Array.isArray(source) ||
        Object.keys(source).length === 0
    ) return null;

    // Create a new object by grouping each property of the source under its corresponding entity from entityMap
    const grouped = Object.keys(source).reduce((accumulator, key) => ({
        ...accumulator,
        [entityMap[key]]: {
            ...accumulator?.[entityMap[key]],
            [key]: source[key]
        }
    }), {});

    // Return null if the resulting object has no keys
    return Object.keys(grouped).length > 0 ? grouped : null;
}

module.exports = { groupByEntity };