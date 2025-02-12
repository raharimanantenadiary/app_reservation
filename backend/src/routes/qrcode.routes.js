// backend/src/routes/qrcode.routes.js

const express           = require('express')
const router            = express.Router()
const adminController   = require('../controllers/admin.controller')
const { verifierToken } = require('../middleware/auth')
const { verifierAdmin } = require('../middleware/isAdmin')

router.get('/verifier/:token', verifierToken, verifierAdmin, adminController.verifierQrcode)

module.exports = router