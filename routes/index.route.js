const router = require('express').Router();

router.use('/authenticate', require(`./authenticate.route`));
router.use('/users', require(`./user.route`));
router.use('/publishers', require(`./publisher.route`));

module.exports = router;