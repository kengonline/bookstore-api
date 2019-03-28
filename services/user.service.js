const moment = require('moment')

const { STATUS } = require('../constants/user.constant');
const { DATABASE_FORMAT } = require('../constants/datetime.constant');
const UserReposity = require('../repositories/user.repository')
const { queryTransaction } = require('../helpers/database.helper')
const SecurityHelper = require('../helpers/security.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const createUser = async (data = {}) => {
    if (await UserReposity.findOneByEmail(data.email)) {
        throw new BusinessError(ErrorCode.COMMON_400_001, [data.email])
    }

    const { salt, encrpytPassword } = SecurityHelper.generateEncryptPassword(data.password)

    const result = await queryTransaction(async conn => {
        const createdDate = moment().format(DATABASE_FORMAT);
        return UserReposity.insert(conn, {
            ...data,
            password: encrpytPassword,
            status: STATUS.ACT_ACTIVE,
            createdBy: "SYSTEM",
            salt,
            createdDate
        });
    })

    return result
}

const getProfileByToken = async (token) => {
    const { userId } = SecurityHelper.extractTokenKey(token)
    const { salt, password, ...profile } = await UserReposity.findOne(userId)
    return {
        ...profile,
        createdDate: moment(profile.createdDate).valueOf(),
        updatedDate: moment(profile.updatedDate).valueOf()
    };
}

module.exports = {
    getProfileByToken,
    createUser
}