const router = require('express').Router();
const asyncHandler = require('express-async-handler')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { User } = require('../../db/models')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
