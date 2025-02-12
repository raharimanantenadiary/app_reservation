const Reservation = require('../models/Reservation')
const TimeSlot    = require('../models/TimeSlot')
const Restaurant  = require('../models/Restaurant')
const qrcodeService = require('../services/qrcode.service')

const creerReservation = async (req, res) => {
    const { restaurant_id, creneau_id, date_reservation, nb_personnes } = req.body
    const utilisateurId = req.utilisateur.id

    try {
        const restaurant = await Restaurant.trouverParId(restaurant_id)

        if (!restaurant) {
            return res.status(404).json({ erreur: 'restaurant introuvable' })
        }

        const creneau = await TimeSlot.trouverParId(creneau_id)

        if (!creneau) {
            return res.status(404).json({ erreur: 'creneau introuvable' })
        }

        const totalReserve = await Reservation.compterReservationsActives(creneau_id, date_reservation)
        const placesRestantes = creneau.capacite_max - totalReserve

        if (nb_personnes > placesRestantes) {
            return res.status(400).json({
                erreur:          'plus assez de places disponibles',
                places_restantes: placesRestantes,
            })
        }

        const nouvelleReservation = await Reservation.creer(
            utilisateurId,
            restaurant_id,
            creneau_id,
            date_reservation,
            nb_personnes
        )

        const qrcode = await qrcodeService.generer(nouvelleReservation.qrcode_token)

        return res.status(201).json({ reservation: nouvelleReservation, qrcode })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la creation de la reservation' })
    }
}

const obtenirMesReservations = async (req, res) => {
    const utilisateurId = req.utilisateur.id

    try {
        const reservations = await Reservation.listerParUtilisateur(utilisateurId)
        return res.status(200).json({ reservations })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation des reservations' })
    }
}

const annulerReservation = async (req, res) => {
    const { id }        = req.params
    const utilisateurId = req.utilisateur.id

    try {
        const reservation = await Reservation.trouverParId(id)

        if (!reservation) {
            return res.status(404).json({ erreur: 'reservation introuvable' })
        }

        if (reservation.utilisateur_id !== utilisateurId) {
            return res.status(403).json({ erreur: 'action non autorisee' })
        }

        if (reservation.statut === 'annulee') {
            return res.status(400).json({ erreur: 'reservation deja annulee' })
        }

        if (reservation.statut === 'refusee') {
            return res.status(400).json({ erreur: 'impossible dannuler une reservation refusee' })
        }

        const reservationAnnulee = await Reservation.changerStatut(id, 'annulee')

        return res.status(200).json({ reservation: reservationAnnulee })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de lannulation de la reservation' })
    }
}

const obtenirReservationParId = async (req, res) => {
    const { id }        = req.params
    const utilisateurId = req.utilisateur.id

    try {
        const reservation = await Reservation.trouverParId(id)

        if (!reservation) {
            return res.status(404).json({ erreur: 'reservation introuvable' })
        }

        if (reservation.utilisateur_id !== utilisateurId) {
            return res.status(403).json({ erreur: 'action non autorisee' })
        }

        return res.status(200).json({ reservation })

    } catch (erreur) {
        return res.status(500).json({ erreur: 'erreur lors de la recuperation de la reservation' })
    }
}

module.exports = {
    creerReservation,
    obtenirMesReservations,
    annulerReservation,
    obtenirReservationParId,
}