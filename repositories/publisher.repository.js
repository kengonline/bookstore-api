const { getConnection } = require('../helpers/database.helper')
const RepositoryHelper = require('../helpers/repository.helper')

const TABLE_NAME = "Publisher"

const findOne = async (id) => RepositoryHelper.findOneById(TABLE_NAME, id)

const findByCriteria = async (criteria = {}) => RepositoryHelper.findByCriteria(TABLE_NAME, criteria)

const insert = (conn, { name, status, note, website, createdDate, createdBy }) => {
    const query = `INSERT INTO ${TABLE_NAME}(name, status, note, website, created_date, created_by) VALUES ?`;
    const values = [name, status, note, website, createdDate, createdBy];
    return conn.query(query, [[values]])
}

module.exports = {
    findOne,
    findByCriteria,
    insert
}