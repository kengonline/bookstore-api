const router = require('express').Router();

const { wrapper } = require('../helpers/route.helper');
const PublisherService = require('../services/publisher.service');

router.get('/', (req, res, next) => wrapper(req, res, next, async () => {
    const { criteria } = req.body
    const result = await PublisherService.getList(criteria)

    res.send(result)
}))

module.exports = router;