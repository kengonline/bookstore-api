const { TYPES: { BUSINESS_ERROR } } = require('../constants/error.constant')

class BusinessError extends Error {
    constructor({ message, code }, args) {
        super(message);
        this.name = BUSINESS_ERROR;
        this.code = code;
        this.args = args;
        this.httpStatus = 400;
    }
}

module.exports = BusinessError;