const router = require('express').Router();

router.use('/authenticate', require(`./authenticate.route`));
router.use('/users', require(`./user.route`));
router.use('/publishers', require(`./publisher.route`));
router.use('/books', require(`./book.route`));

module.exports = router;