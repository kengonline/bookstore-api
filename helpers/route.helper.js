const moment = require('moment')
const EnvConfig = require('../configs/env.config')
const redisClient = require('../configs/redis.config')
const { COOKIE } = require('../constants/http.constant')
const UnauthorizedError = require('../errors/UnauthorizedError')
const DateTimeHelper = require('../helpers/datetime.helper')
const SecurityHelper = require('../helpers/security.helper')


const exceptionWrapper = async (req, res, next, callback) => {
    try {
        await callback(req, res, next)
    } catch (e) {
        next(e)
    }
}

const isRenewTime = (createdDate, renewTime) => moment().isSameOrAfter(moment(createdDate + renewTime))

const renewToken = async (oldKey, createdDate, duration, oldTokenTTL) => {
    const { userId } = SecurityHelper.extractTokenKey(oldKey)
    const key = SecurityHelper.generateToken(userId);
    const newTokenKey = SecurityHelper.getRedisTokenKey(key);

    await Promise.all([
        redisClient.set(oldKey, SecurityHelper.generateTokenValue(createdDate, newTokenKey), 'PX', oldTokenTTL),
        redisClient.set(newTokenKey, `${moment().valueOf()}|`, 'PX', duration)
    ]);

    return key;
}

const isExpired = (createdDate, sessionTime) => {
    if (createdDate === undefined) {
        return true;
    }

    const now = moment();
    const expired = moment(createdDate + sessionTime);
    return now.isSameOrAfter(expired);
}

const wrapper = async (req, res, next, callback) => {
    console.log(`[${DateTimeHelper.getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);

    await exceptionWrapper(req, res, next, callback)

    console.log(`[${DateTimeHelper.getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

const secureWrapper = async (req, res, next, callback) => {
    console.log(`[${DateTimeHelper.getLogTime()}] Begin: [${req.method}] ${req.originalUrl}`);

    const { token } = req.cookies;
    if (token === undefined) {
        next(new UnauthorizedError())
    }

    const duration = parseInt(EnvConfig.session.duration, 10);
    const renewTime = parseInt(EnvConfig.session.renewTime, 10);

    const oldTokenKey = SecurityHelper.getRedisTokenKey(token);

    const [value, oldTokenTTL] = await Promise.all([
        redisClient.getAsync(oldTokenKey),
        redisClient.pttlAsync(oldTokenKey)
    ]);

    const { createdDate, newTokenKey } = SecurityHelper.extractTokenValue(value);

    const isRenew = isRenewTime(createdDate, renewTime);

    if (await isExpired(createdDate, duration)) {
        next(new UnauthorizedError())
    } else if (isRenew && newTokenKey === undefined) {
        const key = await renewToken(oldTokenKey, createdDate, duration, oldTokenTTL);

        console.log(`[${DateTimeHelper.getLogTime()}] Token: ${token} => ${key}`);
        res.cookie(COOKIE.TOKEN, key, { maxAge: duration });
        await exceptionWrapper(req, res, next, callback)
    } else if (isRenew) {
        res.cookie(COOKIE.TOKEN, newTokenKey, { maxAge: duration });
        await exceptionWrapper(req, res, next, callback)
    } else {
        await exceptionWrapper(req, res, next, callback)
    }

    console.log(`[${DateTimeHelper.getLogTime()}] End: [${req.method}] ${req.originalUrl}`);
}

module.exports = {
    wrapper,
    secureWrapper
}