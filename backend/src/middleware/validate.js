const Joi = require('joi')

const schemaInscription = Joi.object({
    nom:          Joi.string().min(2).max(100).required(),
    prenom:       Joi.string().min(2).max(100).required(),
    email:        Joi.string().email().required(),
    mot_de_passe: Joi.string().min(6).required(),
})

const schemaConnexion = Joi.object({
    email:        Joi.string().email().required(),
    mot_de_passe: Joi.string().required(),
})

const schemaRestaurant = Joi.object({
    nom:         Joi.string().min(2).max(150).required(),
    description: Joi.string().optional(),
    adresse:     Joi.string().required(),
    telephone:   Joi.string().optional(),
    email:       Joi.string().email().optional(),
    image_url:   Joi.string().uri().optional(),
})

const schemaCreneau = Joi.object({
    restaurant_id: Joi.string().uuid().required(),
    jour_semaine:  Joi.number().integer().min(0).max(6).required(),
    heure_debut:   Joi.string().pattern(/^([0-1]\d|2[0-3]):[0-5]\d$/).required(),
    capacite_max:  Joi.number().integer().min(1).required(),
})

const schemaReservation = Joi.object({
    restaurant_id:    Joi.string().uuid().required(),
    creneau_id:       Joi.string().uuid().required(),
    date_reservation: Joi.date().min('now').required(),
    nb_personnes:     Joi.number().integer().min(1).required(),
})

const valider = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            const messages = error.details.map(detail => detail.message)
            return res.status(400).json({ erreurs: messages })
        }

        next()
    }
}

module.exports = {
    validerInscription:  valider(schemaInscription),
    validerConnexion:    valider(schemaConnexion),
    validerRestaurant:   valider(schemaRestaurant),
    validerCreneau:      valider(schemaCreneau),
    validerReservation:  valider(schemaReservation),
}