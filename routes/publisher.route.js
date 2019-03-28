const router = require('express').Router();

const { wrapper, secureWrapper } = require('../helpers/route.helper');
const UserService = require('../services/user.service');
const PublisherService = require('../services/publisher.service');

router.get('/', (req, res, next) => wrapper(req, res, next, async () => {
    const { criteria } = req.body
    const result = await PublisherService.getList(criteria)

    res.send(result)
}))

router.get('/:id', (req, res, next) => wrapper(req, res, next, async () => {
    const result = await PublisherService.getDetail(req.params.id)

    res.send(result)
}))

router.post('/', (req, res, next) => secureWrapper(req, res, next, async () => {
    const { name, status, note, website } = req.body

    const profile = await UserService.getProfileByToken(req.cookies.token);

    const data = { name, status, note, website };
    await PublisherService.create(data, profile)
    res.send()
}))

module.exports = router;