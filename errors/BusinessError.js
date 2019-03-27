const { TYPES: { BUSINESS_ERROR } } = require('../constants/error.constant')
const { getMessage } = require('../helpers/error.helper')

class BusinessError extends Error {
    constructor({ message, code }, args) {
        super(getMessage(message, args));
        this.name = BUSINESS_ERROR;
        this.code = code;
        this.args = args;
        this.httpStatus = 400;
    }
}

module.exports = BusinessError;