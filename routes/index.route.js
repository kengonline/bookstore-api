const router = require('express').Router();

router.use('/authenticate', require(`./authenticate.route`));

module.exports = router;