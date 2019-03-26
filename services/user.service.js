const BusinessError = require('../errors/BusinessError')

const { findOneByEmail } = require('../repositories/user.repository')

const { getConnection, queryTransaction } = require('../helpers/database.helper')

const register = async ({ email, password, firstName, lastName }) => {
    if (!(await findOneByEmail(email))) {
        throw new BusinessError("This email is taken.", { email })
    }
}

module.exports = {
    register
}