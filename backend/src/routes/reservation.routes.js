// backend/src/routes/reservation.routes.js

const express                = require('express')
const router                 = express.Router()
const reservationController  = require('../controllers/reservation.controller')
const { verifierToken }      = require('../middleware/auth')
const { validerReservation } = require('../middleware/validate')

router.post('/',     verifierToken, validerReservation, reservationController.creerReservation)
router.get('/',      verifierToken,                     reservationController.obtenirMesReservations)
router.get('/:id',   verifierToken,                     reservationController.obtenirReservationParId)
router.patch('/:id/annuler', verifierToken,             reservationController.annulerReservation)

module.exports = router