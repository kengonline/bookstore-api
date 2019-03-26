const crypto = require('crypto');

const { STATUS } = require('../constants/user.constant');
const { findOneByEmail, insertUser } = require('../repositories/user.repository')
const { queryTransaction } = require('../helpers/database.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const getEncryptPassword = (password) => {
    const salt = genRandomString(16);
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        encrpytPassword: value
    };
};

const register = async (data = {}) => {
    if (await findOneByEmail(data.email)) {
        throw new BusinessError(ErrorCode.USER_400_001)
    }

    const { salt, encrpytPassword } = getEncryptPassword(data.password)

    const result = await queryTransaction(async conn => {
        return await insertUser(conn, { ...data, password: encrpytPassword, status: STATUS.ACT_ACTIVE, salt });
    })

    return result
}

module.exports = {
    register
}