
const express           = require('express')
const router            = express.Router()
const adminController   = require('../controllers/admin.controller')
const { verifierToken } = require('../middleware/auth')
const { verifierAdmin } = require('../middleware/isAdmin')
const { validerRestaurant, validerCreneau } = require('../middleware/validate')

router.get('/reservations', verifierToken, verifierAdmin, adminController.obtenirToutesLesReservations)
router.patch('/reservations/:id/valider', verifierToken, verifierAdmin, adminController.validerReservation)
router.patch('/reservations/:id/refuser', verifierToken, verifierAdmin, adminController.refuserReservation)
router.get('/statistiques', verifierToken, verifierAdmin, adminController.obtenirStatistiques)
router.post('/restaurants', verifierToken, verifierAdmin, validerRestaurant, adminController.ajouterRestaurant)
router.put('/restaurants/:id', verifierToken, verifierAdmin, validerRestaurant, adminController.modifierRestaurant)
router.delete('/restaurants/:id', verifierToken, verifierAdmin, adminController.supprimerRestaurant)
router.post('/creneaux', verifierToken, verifierAdmin, validerCreneau, adminController.ajouterCreneau)
router.delete('/creneaux/:id', verifierToken, verifierAdmin, adminController.desactiverCreneau)

module.exports = router