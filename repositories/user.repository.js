const moment = require('moment');
const { getConnection } = require('../helpers/database.helper')
const RepositoryHelper = require('../helpers/repository.helper')

const TABLE_NAME = "User"

const findOne = async (id) => RepositoryHelper.findOneById(TABLE_NAME, id)

const findOneByEmail = async (email) => {
    const rows = await RepositoryHelper.findByCriteria(TABLE_NAME, { email });
    return rows.length ? rows[0] : undefined;
}

const insertUser = (conn, { email, password, firstName, lastName, status, salt }) => {
    const query = `INSERT INTO ${TABLE_NAME}(email, password, first_name, last_name, status, salt, created_date, created_by) VALUES ?`;
    const values = [email, password, firstName, lastName, status, salt, moment().format('YYYY-MM-DD HH:mm:ss'), "SYSTEM"];
    return conn.query(query, [[values]])
}

module.exports = {
    findOne,
    findOneByEmail,
    insertUser
}