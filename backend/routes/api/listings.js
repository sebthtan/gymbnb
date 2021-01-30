const express = require('express')
const router = express.Router()
const { User, Host, City, State, Listing, Photo, Review } = require('../../db/models')
const { Op } = require('sequelize')
const asyncHandler = require('express-async-handler')

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
                }
            }
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
        ]
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

module.exports = router
