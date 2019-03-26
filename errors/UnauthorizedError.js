const { TYPES: { UNAUTHORIZED_ERROR } } = require('../constants/error.constant')

class AuthorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = UNAUTHORIZED_ERROR;
        this.httpStatus = 401;
    }
}

module.exports = AuthorizedError;