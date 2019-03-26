const router = require('express').Router();

router.use('/authenticate', require(`./authenticate.route`));
router.use('/users', require(`./user.route`));

module.exports = router;