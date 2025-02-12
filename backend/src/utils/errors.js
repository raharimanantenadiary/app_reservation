// backend/src/utils/errors.js

const creerErreur = (message, statut) => {
    const erreur  = new Error(message)
    erreur.statut = statut
    return erreur
}

const erreurNonTrouve    = (message) => creerErreur(message, 404)
const erreurNonAutorise  = (message) => creerErreur(message, 403)
const erreurNonAuthentifie = (message) => creerErreur(message, 401)
const erreurValidation   = (message) => creerErreur(message, 400)
const erreurServeur      = (message) => creerErreur(message, 500)

module.exports = {
    erreurNonTrouve,
    erreurNonAutorise,
    erreurNonAuthentifie,
    erreurValidation,
    erreurServeur,
}