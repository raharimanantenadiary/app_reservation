const Restaurant = require('../models/Restaurant')
const TimeSlot   = require('../models/TimeSlot')

const obtenirTousLesRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.listerTous()
        return res.status(200).json({ restaurants })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation des restaurants' })
    }
}

const obtenirRestaurantParId = async (req, res) => {
    const { id } = req.params

    try {
        const restaurant = await Restaurant.trouverParId(id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        const creneaux = await TimeSlot.listerParRestaurant(id)

        return res.status(200).json({ restaurant, creneaux })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation du restaurant' })
    }
}

const obtenirCreneauxDisponibles = async (req, res) => {
    const { id }          = req.params
    const { jour_semaine } = req.query

    if (jour_semaine === undefined) {
        return res.status(400).json({ erreur: 'jour_semaine est requis' })
    }

    try {
        const restaurant = await Restaurant.trouverParId(id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        const creneaux = await TimeSlot.listerDisponibles(id, jour_semaine)

        return res.status(200).json({ creneaux })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation des creneaux' })
    }
}

module.exports = {
    obtenirTousLesRestaurants,
    obtenirRestaurantParId,
    obtenirCreneauxDisponibles,
}