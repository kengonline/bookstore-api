const router = require('express').Router();

const { wrapper } = require('../helpers/route.helper');

const { register } = require('../services/user.service');

router.post('/', (req, res, next) => wrapper(req, res, next, async () => {
    const { email, password, firstName, lastName } = req.body;

    await register({ email, password, firstName, lastName })
}))

module.exports = router;