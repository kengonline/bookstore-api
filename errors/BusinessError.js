const { TYPES: { BUSINESS_ERROR } } = require('../constants/error.constant')

class BusinessError extends Error {
    constructor(message, args) {
        super(message);
        this.name = BUSINESS_ERROR;
        this.args = args;
    }
}

module.exports = BusinessError;