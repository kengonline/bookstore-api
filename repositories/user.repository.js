const moment = require('moment');
const { getConnection } = require('../helpers/database.helper')

const TABLE_NAME = "User"

const findOneById = async (id) => {
    const conn = await getConnection();
    const [rows] = await conn.execute(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id])
    return rows.length ? rows[0] : undefined;
}

const findOneByEmail = async (email) => {
    const conn = await getConnection();
    const [rows] = await conn.execute(`SELECT * FROM ${TABLE_NAME} WHERE email = ?`, [email])
    return rows.length ? rows[0] : undefined;
}

const insertUser = (conn, { email, password, firstName, lastName, status, salt }) => {
    const query = `INSERT INTO ${TABLE_NAME}(email, password, first_name, last_name, status, salt, created_date, created_by) VALUES ?`;
    const values = [email, password, firstName, lastName, status, salt, moment().format('YYYY-MM-DD HH:mm:ss'), "SYSTEM"];
    return conn.query(query, [[values]])
}

module.exports = {
    findOneById,
    findOneByEmail,
    insertUser
}