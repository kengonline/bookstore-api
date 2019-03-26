const router = require('express').Router();

const { wrapper } = require('../helpers/route.helper');

router.post('/login', (req, res, next) => wrapper(req, res, next, () => {
    const { username } = req.body;
    if (username !== "kengonline") {
        res.send({
            message: "error"
        })
    } else {
        res.send({
            message: "success"
        })
    }
}))

router.post('/logout', (req, res, next) => wrapper(req, res, next, () => {
    res.send("Logout success")
}))

module.exports = router;