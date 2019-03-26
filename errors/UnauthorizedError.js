const { TYPES: { UNAUTHORIZED_ERROR } } = require('../constants/error.constant')

class AuthorizedError extends Error {
    constructor(data = {}) {
        const { code = undefined, message = "Unauthorized" } = data;
        super(message);
        this.name = UNAUTHORIZED_ERROR;
        this.code = code;
        this.httpStatus = 401;
    }
}

module.exports = AuthorizedError;