const moment = require('moment')

const { LOGGER_FORMAT } = require('../constants/datetime.constant')

const getLogTime = () => moment().format(LOGGER_FORMAT)

module.exports = {
    getLogTime
}