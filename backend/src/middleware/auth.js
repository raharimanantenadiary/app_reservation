const jwt = require('jsonwebtoken')

const verifierToken = (req, res, next) => {
    const entete        = req.headers.authorization
    const tokenPresent  = entete && entete.startsWith('Bearer ')

    if (!tokenPresent) {
        return res.status(401).json({ erreur: 'token manquant' })
    }

    const token = entete.split(' ')[1]

    try {
        const payload  = jwt.verify(token, process.env.JWT_SECRET)
        req.utilisateur = payload
        next()
    } catch (erreur) {
        return res.status(401).json({ erreur: 'token invalide ou expire' })
    }
}

module.exports = { verifierToken }