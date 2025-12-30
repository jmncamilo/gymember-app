const pool = require("../../db/connection.js");

/*
 * Dynamically builds and executes a MySQL UPDATE query based on the properties
 * of a given object. Uses prepared statements (placeholders) for values to
 * ensure safe execution.
 *
 * If the update does not affect any rows or if the input parameters are invalid,
 * the function returns null.
 */
async function updateByCondition(
    updateData,
    conditionValue,
    table,
    conditionColumn,
    connection = null
) {
    // Validate update data object
    if (
        !updateData ||
        typeof updateData !== 'object' ||
        Array.isArray(updateData) ||
        !Object.keys(updateData).length
    ) return null;

    // Validate remaining parameters
    if (!table || typeof table !== 'string') return null;
    if (!conditionColumn || typeof conditionColumn !== 'string') return null;
    if (conditionValue === undefined || conditionValue === null) return null;

    const columnsQuery = [];
    const values = [];

    // Build SET clause dynamically
    for (const key in updateData) {
        columnsQuery.push(`${key} = ?`);
        values.push(updateData[key]);
    }

    // Always append condition value at the end
    values.push(conditionValue);

    // Build final query
    const finalQuery = `
        UPDATE ${table}
        SET ${columnsQuery.join(', ')}
        WHERE ${conditionColumn} = ?
    `;

    // Execute query using mysql2/promises
    const executor = connection || pool;
    const [result] = await executor.execute(finalQuery, values);

    return result?.affectedRows === 0 ? null : result;
}

module.exports = updateByCondition;