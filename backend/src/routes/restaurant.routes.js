// backend/src/routes/restaurant.routes.js

const express               = require('express')
const router                = express.Router()
const restaurantController  = require('../controllers/restaurant.controller')

router.get('/',                        restaurantController.obtenirTousLesRestaurants)
router.get('/:id',                     restaurantController.obtenirRestaurantParId)
router.get('/:id/creneaux',            restaurantController.obtenirCreneauxDisponibles)

module.exports = router