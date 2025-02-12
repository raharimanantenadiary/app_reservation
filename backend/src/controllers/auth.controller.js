// backend/src/controllers/auth.controller.js

const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const User   = require('../models/User')

const genererToken = (utilisateur) => {
    return jwt.sign(
        { id: utilisateur.id, role: utilisateur.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

const inscrire = async (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body

    try {
        const utilisateurExistant = await User.trouverParEmail(email)

        if (utilisateurExistant) {
            return res.status(400).json({ erreur: 'cet email est deja utilise' })
        }

        const motDePasseHache  = await bcrypt.hash(mot_de_passe, 10)
        const nouvelUtilisateur = await User.creer(nom, prenom, email, motDePasseHache)
        const token             = genererToken(nouvelUtilisateur)

        return res.status(201).json({ utilisateur: nouvelUtilisateur, token })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de linscription' })
    }
}

const connecter = async (req, res) => {
    const { email, mot_de_passe } = req.body

    try {
        const utilisateur = await User.trouverParEmail(email)

        if (!utilisateur) {
            return res.status(401).json({ erreur: 'email ou mot de passe incorrect' })
        }

        const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)

        if (!motDePasseValide) {
            return res.status(401).json({ erreur: 'email ou mot de passe incorrect' })
        }

        const token = genererToken(utilisateur)

        const { mot_de_passe: _, ...utilisateurSansMotDePasse } = utilisateur

        return res.status(200).json({ utilisateur: utilisateurSansMotDePasse, token })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la connexion' })
    }
}

const obtenirProfil = async (req, res) => {
    try {
        const utilisateur = await User.trouverParId(req.utilisateur.id)

        if (!utilisateur) {
            return res.status(404).json({ erreur: 'utilisateur introuvable' })
        }

        return res.status(200).json({ utilisateur })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation du profil' })
    }
}

module.exports = { inscrire, connecter, obtenirProfil }