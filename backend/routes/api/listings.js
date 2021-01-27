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
                    model: User, attributes: ['username', 'email']
                }
            },
            {
                model: Photo, attributes: ['url', 'caption']
            }
        ]
    })
    return res.json(listings)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const listing = await Listing.findByPk(req.params.id);
    return res.json(listing)
}))

// router.get('/search?q=', asyncHandler(async (req, res) => {
//     const term = req.query.q

//     const filtered = await Listing.findAll({
//         include: {
//             model: City, attributes: ['name'],
//             where: {
//                 name: {
//                     [Op.iLike]: `%${term}%`
//                 }
//             },
//             include: {
//                 model: State, attributes: ['name'],
//                 where: {
//                     name: {
//                         [Op.iLike]: `%${term}`
//                     }
//                 }
//             }
//         },
//     })
// }))

module.exports = router
