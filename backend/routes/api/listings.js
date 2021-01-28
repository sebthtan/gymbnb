const express = require('express')
const router = express.Router()
const { User, Host, City, State, Listing, Photo } = require('../../db/models')
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
            }
        ]
    })
    return res.json(listings)
}))

// router.get(`/:id(\\d+)`, asyncHandler(async (req, res) => {
//     const listing = await Listing.findByPk(req.params.id, {
//         include: [
//             {
//                 model: City, attributes: ['name'],
//                 include: {
//                     model: State, attributes: ['name'],
//                 },
//             },
//             {
//                 model: Host, attributes: ['userId'],
//                 include: {
//                     model: User, attributes: ['username', 'email', 'createdAt']
//                 }
//             },
//             {
//                 model: Photo, attributes: ['url', 'caption']
//             }
//         ]
//     });
//     return res.json(listing)
// }))

module.exports = router
