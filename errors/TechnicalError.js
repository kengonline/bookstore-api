const { TYPES: { TECHNICAL_ERROR } } = require('../constants/error.constant')

class TechnicalError extends Error {
    constructor(message) {
        super(message);
        this.name = TECHNICAL_ERROR;
        this.httpStatus = 500;
    }
}

module.exports = TechnicalError;