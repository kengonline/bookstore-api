const MySql = require('mysql2');
const EnvConfig = require('./env')

const pool = MySql.createPool({
    host: EnvConfig.database.host,
    database: EnvConfig.database.name,
    user: EnvConfig.database.username,
    password: EnvConfig.database.password,
    connectionLimit: EnvConfig.database.connectionLimit
});

const connection = pool.promise();

module.exports = connection;