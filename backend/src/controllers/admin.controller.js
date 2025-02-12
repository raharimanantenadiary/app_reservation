// backend/src/controllers/admin.controller.js

const Restaurant  = require('../models/Restaurant')
const Reservation = require('../models/Reservation')
const TimeSlot    = require('../models/TimeSlot')

const ajouterRestaurant = async (req, res) => {
    const { nom, description, adresse, telephone, email, image_url } = req.body

    try {
        const restaurant = await Restaurant.creer(nom, description, adresse, telephone, email, image_url)
        return res.status(201).json({ restaurant })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la creation du restaurant' })
    }
}

const modifierRestaurant = async (req, res) => {
    const { id }                                                       = req.params
    const { nom, description, adresse, telephone, email, image_url } = req.body

    try {
        const restaurant = await Restaurant.trouverParId(id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        const restaurantModifie = await Restaurant.modifier(
            id, nom, description, adresse, telephone, email, image_url
        )

        return res.status(200).json({ restaurant: restaurantModifie })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la modification du restaurant' })
    }
}

const supprimerRestaurant = async (req, res) => {
    const { id } = req.params

    try {
        const restaurant = await Restaurant.trouverParId(id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        await Restaurant.supprimer(id)

        return res.status(200).json({ message: 'restaurant desactive avec succes' })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la suppression du restaurant' })
    }
}

const ajouterCreneau = async (req, res) => {
    const { restaurant_id, jour_semaine, heure_debut, capacite_max } = req.body

    try {
        const restaurant = await Restaurant.trouverParId(restaurant_id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        const creneau = await TimeSlot.creer(restaurant_id, jour_semaine, heure_debut, capacite_max)

        return res.status(201).json({ creneau })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la creation du creneau' })
    }
}

const desactiverCreneau = async (req, res) => {
    const { id } = req.params

    try {
        const creneau = await TimeSlot.trouverParId(id)

        if (!creneau) {
            return res.status(404).json({ erreur: 'creneau introuvable' })
        }

        await TimeSlot.desactiver(id)

        return res.status(200).json({ message: 'creneau desactive avec succes' })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la desactivation du creneau' })
    }
}

const obtenirToutesLesReservations = async (req, res) => {
    try {
        const reservations = await Reservation.listerToutes()
        return res.status(200).json({ reservations })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation des reservations' })
    }
}

const validerReservation = async (req, res) => {
    const { id } = req.params

    try {
        const reservation = await Reservation.trouverParId(id)

        if (!reservation) {
            return res.status(404).json({ erreur: 'reservation introuvable' })
        }

        if (reservation.statut !== 'en_attente') {
            return res.status(400).json({ erreur: 'seules les reservations en attente peuvent etre validees' })
        }

        const reservationValidee = await Reservation.changerStatut(id, 'confirmee')

        return res.status(200).json({ reservation: reservationValidee })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la validation de la reservation' })
    }
}

const refuserReservation = async (req, res) => {
    const { id } = req.params

    try {
        const reservation = await Reservation.trouverParId(id)

        if (!reservation) {
            return res.status(404).json({ erreur: 'reservation introuvable' })
        }

        if (reservation.statut !== 'en_attente') {
            return res.status(400).json({ erreur: 'seules les reservations en attente peuvent etre refusees' })
        }

        const reservationRefusee = await Reservation.changerStatut(id, 'refusee')

        return res.status(200).json({ reservation: reservationRefusee })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors du refus de la reservation' })
    }
}

const verifierQrcode = async (req, res) => {
    const { token } = req.params

    try {
        const reservation = await Reservation.trouverParQrcodeToken(token)

        if (!reservation) {
            return res.status(404).json({ erreur: 'qrcode invalide' })
        }

        if (reservation.statut !== 'confirmee') {
            return res.status(400).json({
                erreur:  'reservation non confirmee',
                statut:  reservation.statut,
            })
        }

        return res.status(200).json({
            message:     'qrcode valide',
            reservation,
        })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la verification du qrcode' })
    }
}

const obtenirStatistiques = async (req, res) => {
    const { executer } = require('../config/db')

    try {
        const reservationsDuJour = await executer(
            `SELECT COUNT(*) AS total
             FROM reservations
             WHERE date_reservation = CURRENT_DATE
             AND statut NOT IN ('annulee', 'refusee')`
        )

        const tauxOccupation = await executer(
            `SELECT
                COUNT(*) FILTER (WHERE statut = 'confirmee') AS confirmees,
                COUNT(*) FILTER (WHERE statut = 'en_attente') AS en_attente,
                COUNT(*) FILTER (WHERE statut = 'annulee')   AS annulees,
                COUNT(*) FILTER (WHERE statut = 'refusee')   AS refusees,
                COUNT(*)                                      AS total
             FROM reservations
             WHERE date_reservation = CURRENT_DATE`
        )

        return res.status(200).json({
            reservations_du_jour: parseInt(reservationsDuJour[0].total),
            statistiques:         tauxOccupation[0],
        })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation des statistiques' })
    }
}

module.exports = {
    ajouterRestaurant,
    modifierRestaurant,
    supprimerRestaurant,
    ajouterCreneau,
    desactiverCreneau,
    obtenirToutesLesReservations,
    validerReservation,
    refuserReservation,
    verifierQrcode,
    obtenirStatistiques,
}