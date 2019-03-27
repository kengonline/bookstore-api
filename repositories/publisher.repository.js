const { getConnection } = require('../helpers/database.helper')
const RepositoryHelper = require('../helpers/repository.helper')

const TABLE_NAME = "Publisher"

const findOne = async (id) => RepositoryHelper.findOneById(TABLE_NAME, id)

const findByCriteria = async (criteria = {}) => {
    const conn = await getConnection();
    const query = `SELECT * FROM ${TABLE_NAME} `
    const [rows] = await conn.execute(query)
    return rows;
}

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