const RepositoryHelper = require('../helpers/repository.helper')

const TABLE_NAME = "Book"

const findOne = async (id) => RepositoryHelper.findOneById(TABLE_NAME, id)

const findByCriteria = async (criteria = {}) => RepositoryHelper.findByCriteria(TABLE_NAME, criteria)

const insert = (conn, { name, status, type, image, description, note, price, publisherId, createdDate, createdBy }) => {
    const query = `INSERT INTO ${TABLE_NAME}(name, status, type, image, description, note, price, publisher_id, created_date, created_by) VALUES ?`;
    const values = [name, status, type, image, description, note, price, publisherId, createdDate, createdBy];
    return conn.query(query, [[values]])
}

module.exports = {
    findOne,
    findByCriteria,
    insert
}