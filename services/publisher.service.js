const PublisherRepository = require("../repositories/publisher.repository")

const getList = async (criteria) => {
    return await PublisherRepository.findByCriteria(criteria);
}

module.exports = {
    getList
}