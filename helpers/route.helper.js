const { getLogTime } = require('../helpers/datetime.helper')

const wrapper = (req, res, next, callback) => {
    console.log(`[${getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);
    callback(req, res, next)
    console.log(`[${getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

const secureWrapper = (req, res, next, callback) => {
    console.log(`[${getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);

    // TODO: Check req token with redis
    const isAuthenticated = false;
    if (isAuthenticated) {
        callback(req, res, next)
    } else {
        res.status(401).send('Unauthenticated');
    }

    console.log(`[${getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

module.exports = {
    wrapper,
    secureWrapper
}