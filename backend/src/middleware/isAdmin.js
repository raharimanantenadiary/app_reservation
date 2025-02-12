const verifierAdmin = (req, res, next) => {
    const utilisateur = req.utilisateur

    if (!utilisateur) {
        return res.status(401).json({ erreur: 'non authentifie' })
    }

    if (utilisateur.role !== 'admin') {
        return res.status(403).json({ erreur: 'acces reserve aux administrateurs' })
    }

    next()
}

module.exports = { verifierAdmin }