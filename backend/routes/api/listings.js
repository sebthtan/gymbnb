const express = require('express')
const router = express.Router()
const { User, Host, City, State, Listing, Photo, Review } = require('../../db/models')
const { Op } = require('sequelize')
const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')

const validateReviews = [
    check('starsRating')
        .exists()
        .isInt({ min: 1 })
        .withMessage('Please rate this location 1-5 stars.'),
    check('content')
        .exists()
        .withMessage('Review must have content.'),
    handleValidationErrors
]

router.get('/', asyncHandler(async (req, res) => {
    const listings = await Listing.findAll({
        include: [
            {
                model: City, attributes: ['name'],
                include: {
                    model: State, attributes: ['name'],
                },
            },
            {
                model: Host, attributes: ['userId'],
                include: {
                    model: User, attributes: ['username', 'email', 'createdAt']
                }
            },
            {
                model: Photo, attributes: ['url', 'caption']
            },
            {
                model: Review,
                include: {
                    model: User, attributes: ['username', 'createdAt']
                },
            }
        ],
        order: [
            [Review, 'createdAt', 'DESC']
        ]
    })
    return res.json(listings)
}))

router.get(`/:id(\\d+)`, asyncHandler(async (req, res) => {
    const listing = await Listing.findByPk(req.params.id, {
        include: [
            {
                model: City, attributes: ['name'],
                include: {
                    model: State, attributes: ['name'],
                },
            },
            {
                model: Host, attributes: ['userId'],
                include: {
                    model: User, attributes: ['username', 'email', 'createdAt']
                }
            },
            {
                model: Photo, attributes: ['url', 'caption']
            },
            {
                model: Review, attributes: ['id', 'userId', 'starsRating', 'content', 'createdAt'],
                include: {
                    model: User, attributes: ['username', 'createdAt']
                }
            }
        ],
        order: [
            [Review, 'createdAt', 'DESC']
        ],
    });
    return res.json(listing)
}))

router.get(`/:id(\\d+)/reviews`, asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            listingId: req.params.id
        }
    })
    return res.json(reviews)
}))

router.post('/:id(\\d+)/reviews/add', validateReviews, requireAuth, asyncHandler(async (req, res) => {
    const listingId = req.params.id
    const { starsRating, content } = req.body

    const review = await Review.create({ listingId: listingId, starsRating, content, userId: req.user.id })

    return res.json(review)
}))

module.exports = router
