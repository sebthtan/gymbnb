const express = require('express')
const router = express.Router()
const { City, State, Listing } = require('../../db/models')
const { Op } = require('sequelize')
const asyncHandler = require('express-async-handler')

router.get('/search', asyncHandler(async (req, res, next) => {
    const { term } = req.query
    const listings = await Listing.findAll({
        include: {
            model: City, attributes: ['name'],
            where: {
                name: {
                    [Op.iLike]: `%${term}%`
                }
            },
            include: {
                model: State, attributes: ['name'],
                where: {
                    name: {
                        [Op.iLike]: `%${term}`
                    }
                }
            }
        },
    })
    return res.json(listings)
}))
