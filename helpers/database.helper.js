const pool = require('../configs/database.config');

const queryTransaction = async (callback) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        await callback(conn);
        await conn.commit();
    } catch (e) {
        await conn.rollback();
        console.log(e.message, e.stack)
    }
    conn.release();
}

const getConnection = async () => await pool.getConnection()

module.exports = {
    getConnection,
    queryTransaction
}