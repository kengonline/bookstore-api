const router = require('express').Router();

const { COOKIE } = require('../constants/http.constant');
const { wrapper } = require('../helpers/route.helper');
const AuthenticateService = require('../services/authenticate.service');

router.post('/login', (req, res, next) => wrapper(req, res, next, async () => {
    const { email, password } = req.body;

    const { profile, token: { key, duration } } = await AuthenticateService.login(email, password);
    res.cookie(COOKIE.TOKEN, key, { maxAge: duration });

    res.send({ token: key, profile });
}))

router.post('/logout', (req, res, next) => wrapper(req, res, next, async () => {
    const { token } = req.cookies;

    await AuthenticateService.logout(token)
    res.cookie(COOKIE.TOKEN, undefined, { maxAge: 0 })
    res.send()
}))

module.exports = router;