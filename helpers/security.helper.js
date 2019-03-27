const crypto = require('crypto');
const Chance = require('chance');

const chance = new Chance();

const TOKEN_PREFIX = "tokens:"

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

const generateToken = (userId) => {
    const token = chance.string({
        length: 10,
        pool: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });

    return `${userId}|${token}`
}

const getRedisTokenKey = (token) => `${TOKEN_PREFIX}${token}`;

const extractTokenKey = (tokenKey) => {
    const [userId, token] = tokenKey.replace(TOKEN_PREFIX, "").split("|");
    return { userId, token };
}

const extractTokenValue = (tokenValue) => {
    if (!tokenValue) {
        return {};
    }

    const [createdDate, newTokenKey] = tokenValue.split("|");

    return {
        createdDate: parseInt(createdDate, 10),
        newTokenKey: newTokenKey ? newTokenKey : undefined
    };
}

const generateTokenValue = (createdDate, newTokenKey) => `${createdDate}|${newTokenKey}`

module.exports = {
    generateEncryptPassword,
    comparePassword,
    generateToken,
    getRedisTokenKey,
    extractTokenKey,
    extractTokenValue,
    generateTokenValue
}