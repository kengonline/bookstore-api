const { STATUS } = require('../constants/user.constant');
const { findOneByEmail, insertUser } = require('../repositories/user.repository')
const { queryTransaction } = require('../helpers/database.helper')
const { generateEncryptPassword } = require('../helpers/security.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const createUser = async (data = {}) => {
    if (await findOneByEmail(data.email)) {
        throw new BusinessError(ErrorCode.USER_400_001)
    }

    const { salt, encrpytPassword } = generateEncryptPassword(data.password)

    const result = await queryTransaction(async conn => {
        return await insertUser(conn, { ...data, password: encrpytPassword, status: STATUS.ACT_ACTIVE, salt });
    })

    return result
}

module.exports = {
    createUser
}