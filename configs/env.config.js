module.exports = {
    app: {
        port: process.env.APP_PORT || 80
    },
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        connectionLimit: process.env.DB_CONNECTION_LIMIT
    },
    redis: {
        host: process.env.REDIS_HOST
    },
    session: {
        duration: process.env.SESSION_DURATION || 1800000,
        renewTime: process.env.SESSION_RENEW_TIME || 600000
    }
}