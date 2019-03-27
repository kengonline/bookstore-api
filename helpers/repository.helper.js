const _ = require('lodash')
const { getConnection } = require('../helpers/database.helper')

const findOneById = async (tableName, id) => {
    const conn = await getConnection();
    const [rows] = await conn.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id])
    return rows.length ? rows[0] : undefined;
}

const generateConditionQuery = (criteria = {}) => {
    if (_.isEmpty(criteria)) {
        return "";
    }

    return Object.keys(criteria).reduce((query, key) => {
        return `${query} ${key}=?`
    }, " WHERE ");
}

const findByCriteria = async (tableName, criteria = {}) => {
    const conn = await getConnection();
    const query = `SELECT * FROM ${tableName} ${generateConditionQuery(criteria)}`
    const [rows] = await conn.execute(query, Object.values(criteria))

    return rows;
}

module.exports = {
    findOneById,
    findByCriteria
}