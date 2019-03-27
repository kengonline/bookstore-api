const crypto = require('crypto');
const Chance = require('chance');

const chance = new Chance();

const genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const encrpyt = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

const generateEncryptPassword = (password) => {
    const salt = genRandomString(16);
    return {
        salt: salt,
        encrpytPassword: encrpyt(password, salt)
    };
};

const comparePassword = (encrpytPassword, password, salt) => {
    return encrpytPassword === encrpyt(password, salt)
}

const generateToken = () => chance.string({
    length: 10,
    pool: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

const getRedisTokenKey = (token) => `tokens:${token}`;

module.exports = {
    generateEncryptPassword,
    comparePassword,
    generateToken,
    getRedisTokenKey
}