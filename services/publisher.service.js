const moment = require('moment')
const { DATABASE_FORMAT } = require('../constants/datetime.constant');
const { STATUS } = require('../constants/common.constant');
const PublisherRepository = require("../repositories/publisher.repository")
const { queryTransaction } = require('../helpers/database.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const getList = async (criteria) => {
    return await PublisherRepository.findByCriteria(criteria);
}

const create = async (data, userContext) => {
    if ((await PublisherRepository.findByCriteria({ name: data.name })).length) {
        throw new BusinessError(ErrorCode.COMMON_400_001, [data.name])
    }

    const result = await queryTransaction(async conn => {
        const createdDate = moment().format(DATABASE_FORMAT);
        return PublisherRepository.insert(conn, {
            ...data,
            status: STATUS.ACT_ACTIVE,
            createdBy: userContext.email,
            createdDate
        })
    })

    return result;
}

module.exports = {
    getList,
    create
}