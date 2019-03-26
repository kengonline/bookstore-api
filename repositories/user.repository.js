const moment = require('moment');
const { getConnection, queryTransaction } = require('../helpers/database.helper')

const findOneByEmail = async (email) => {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM `User` WHERE email = ?", [email])
    return rows.length ? rows[0] : undefined;
}

const insertUser = (conn, { email, password, firstName, lastName, status, salt }) => {
    const query = "INSERT INTO User(email, password, first_name, last_name, status, salt, created_date, created_by) VALUES ?";
    const values = [email, password, firstName, lastName, status, salt, moment().format('YYYY-MM-DD HH:mm:ss'), "SYSTEM"];
    return conn.query(query, [[values]])
}

module.exports = {
    findOneByEmail,
    insertUser
}