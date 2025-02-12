const express = require('express')
const cors    = require('cors')
const dotenv  = require('dotenv')

dotenv.config()

const routesAuth        = require('./src/routes/auth.routes')
const routesRestaurant  = require('./src/routes/restaurant.routes')
const routesReservation = require('./src/routes/reservation.routes')
const routesAdmin       = require('./src/routes/admin.routes')
const routesQrcode      = require('./src/routes/qrcode.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth',         routesAuth)
app.use('/api/restaurants',  routesRestaurant)
app.use('/api/reservations', routesReservation)
app.use('/api/admin',        routesAdmin)
app.use('/api/qrcode',       routesQrcode)

app.get('/api/health', (req, res) => {
    res.json({ statut: 'serveur en ligne' })
})

app.use((req, res) => {
    res.status(404).json({ erreur: 'route introuvable' })
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({ erreur: 'erreur interne du serveur' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`serveur démarré sur le port ${PORT}`)
})