// backend/src/routes/auth.routes.js

const express        = require('express')
const router         = express.Router()
const authController = require('../controllers/auth.controller')
const { verifierToken }      = require('../middleware/auth')
const { validerInscription, validerConnexion } = require('../middleware/validate')

router.post('/inscription', validerInscription, authController.inscrire)
router.post('/connexion',   validerConnexion,   authController.connecter)
router.get('/profil',       verifierToken,      authController.obtenirProfil)

module.exports = router