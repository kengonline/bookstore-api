const moment = require('moment')

const EnvConfig = require('../configs/env.config')
const redisClient = require('../configs/redis.config')
const UserRepository = require('../repositories/user.repository')
const SecurityHelper = require('../helpers/security.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const newToken = async () => {
    const { duration } = EnvConfig.session;
    const token = SecurityHelper.generateToken();
    const tokenKey = SecurityHelper.getRedisTokenKey(token);

    await redisClient.set(tokenKey, `${moment().valueOf()}|`, 'PX', duration);

    return { key: token, duration };
}

const login = async (email, password) => {
    const user = await UserRepository.findOneByEmail(email);

    if (user === undefined || !SecurityHelper.comparePassword(user.password, password, user.salt)) {
        throw new BusinessError(ErrorCode.USER_400_002)
    }

    const token = await newToken();

    return { user, token };
}

const logout = async (token) => {
    await redisClient.del(SecurityHelper.getRedisTokenKey(token));
}

module.exports = {
    login,
    logout
}