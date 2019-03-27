const getMessage = (text, args) => {
    if (!Array.isArray(args)) {
        return text;
    }

    return args.reduce((result, item, index) => {
        return result.replace(`{${index}}`, item);
    }, text)
}

module.exports = {
    getMessage
}