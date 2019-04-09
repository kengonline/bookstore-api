const moment = require('moment')
const { DATABASE_FORMAT } = require('../constants/datetime.constant');
const { STATUS } = require('../constants/common.constant');
const BookRepository = require("../repositories/book.repository")
const PublisherService = require("../services/publisher.service")
const { queryTransaction } = require('../helpers/database.helper')
const BusinessError = require('../errors/BusinessError')
const ErrorCode = require('../assets/error_code.json')

const getList = async (criteria) => {
    const result = await BookRepository.findByCriteria(criteria);

    return result.map(item => ({
        ...item,
        createdDate: moment(item.createdDate).valueOf(),
        updatedDate: moment(item.updatedDate).valueOf()
    }))
}

const getDetail = async (id) => {
    const result = await BookRepository.findOne(id);

    if (result === undefined) {
        throw new BusinessError(ErrorCode.COMMON_400_002, ["Book"])
    }

    return {
        ...result,
        createdDate: moment(result.createdDate).valueOf(),
        updatedDate: moment(result.updatedDate).valueOf()
    }
}

const create = async (data, userContext) => {
    if ((await BookRepository.findByCriteria({ name: data.name })).length) {
        throw new BusinessError(ErrorCode.COMMON_400_001, [data.name])
    } else if (!(await PublisherService.getDetail(data.publisherId))) {
        throw new BusinessError(ErrorCode.COMMON_400_002, "Publisher")
    }

    const result = await queryTransaction(async conn => {
        const createdDate = moment().format(DATABASE_FORMAT);
        return BookRepository.insert(conn, {
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
    getDetail,
    create
}