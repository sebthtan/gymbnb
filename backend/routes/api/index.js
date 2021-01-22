const router = require('express').Router();
const asyncHandler = require('express-async-handler')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { User } = require('../../db/models')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
