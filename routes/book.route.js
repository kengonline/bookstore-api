const router = require('express').Router();

const { wrapper, secureWrapper } = require('../helpers/route.helper');
const UserService = require('../services/user.service');
const BookService = require('../services/book.service');

router.get('/', (req, res, next) => wrapper(req, res, next, async () => {
    const result = await BookService.getList(req.query)

    res.send(result)
}))

router.get('/:id', (req, res, next) => wrapper(req, res, next, async () => {
    const result = await BookService.getDetail(req.params.id)

    res.send(result)
}))

router.post('/', (req, res, next) => secureWrapper(req, res, next, async () => {
    const profile = await UserService.getProfileByToken(req.cookies.token);
    await BookService.create(req.body, profile)
    res.send()
}))

module.exports = router;