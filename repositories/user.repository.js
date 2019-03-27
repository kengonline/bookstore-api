const { getConnection } = require('../helpers/database.helper')
const RepositoryHelper = require('../helpers/repository.helper')

const TABLE_NAME = "User"

const findOne = async (id) => RepositoryHelper.findOneById(TABLE_NAME, id)

const findOneByEmail = async (email) => {
    const rows = await RepositoryHelper.findByCriteria(TABLE_NAME, { email });
    return rows.length ? rows[0] : undefined;
}

const insert = (conn, { email, password, firstName, lastName, status, salt, createdDate, createdBy }) => {
    const query = `INSERT INTO ${TABLE_NAME}(email, password, first_name, last_name, status, salt, created_date, created_by) VALUES ?`;
    const values = [email, password, firstName, lastName, status, salt, createdDate, createdBy];
    return conn.query(query, [[values]])
}

module.exports = {
    findOne,
    findOneByEmail,
    insert
}