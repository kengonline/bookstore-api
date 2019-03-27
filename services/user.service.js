const { STATUS } = require('../constants/user.constant');
const UserReposity = require('../repositories/user.repository')
const { queryTransaction } = require('../helpers/database.helper')
const SecurityHelper = require('../helpers/security.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const createUser = async (data = {}) => {
    if (await UserReposity.findOneByEmail(data.email)) {
        throw new BusinessError(ErrorCode.USER_400_001)
    }

    const { salt, encrpytPassword } = SecurityHelper.generateEncryptPassword(data.password)

    const result = await queryTransaction(async conn => {
        return await UserReposity.insertUser(conn, { ...data, password: encrpytPassword, status: STATUS.ACT_ACTIVE, salt });
    })

    return result
}

const getProfileByToken = async (token) => {
    const { userId } = SecurityHelper.extractTokenKey(token)
    const { salt, password, ...profile } = await UserReposity.findOneById(userId)
    return profile;
}

module.exports = {
    getProfileByToken,
    createUser
}