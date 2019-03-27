const router = require('express').Router();

const { wrapper, secureWrapper } = require('../helpers/route.helper');

const UserService = require('../services/user.service');

router.post('/', (req, res, next) => wrapper(req, res, next, async () => {
    const { email, password, firstName, lastName } = req.body;

    await UserService.createUser({ email, password, firstName, lastName });

    res.send()
}))

router.get('/profile', (req, res, next) => secureWrapper(req, res, next, async () => {
    res.send({ msg: "profile" })
}))

module.exports = router;