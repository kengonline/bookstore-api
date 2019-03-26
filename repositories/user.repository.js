const { getConnection, queryTransaction } = require('../helpers/database.helper')

const findOneByEmail = async (email) => {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM `User` WHERE email = ?", [email])
    return rows.length ? rows[0] : undefined;
}

module.exports = {
    findOneByEmail
}