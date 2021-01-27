const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/listings', listingsRouter)

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
