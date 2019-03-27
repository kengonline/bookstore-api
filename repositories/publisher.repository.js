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

module.exports = {
    findOne,
    findByCriteria
}