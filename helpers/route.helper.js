const UnauthorizedError = require('../errors/UnauthorizedError')
const { getLogTime } = require('../helpers/datetime.helper')

const exceptionWrapper = async (req, res, next, callback) => {
    try {
        await callback(req, res, next)
    } catch (e) {
        next(e)
    }
}

const wrapper = async (req, res, next, callback) => {
    console.log(`[${getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);

    await exceptionWrapper(req, res, next, callback)

    console.log(`[${getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

const secureWrapper = async (req, res, next, callback) => {
    console.log(`[${getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);

    // TODO: Check req token with redis
    const isAuthenticated = false;
    if (!isAuthenticated) {
        throw new UnauthorizedError();
    }

    await exceptionWrapper(req, res, next, callback)

    console.log(`[${getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

module.exports = {
    wrapper,
    secureWrapper
}