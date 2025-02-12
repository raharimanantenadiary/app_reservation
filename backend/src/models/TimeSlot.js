const { executer } = require('../config/db')

const listerParRestaurant = async (restaurantId) => {
    return await executer(
        `SELECT * FROM creneaux
         WHERE restaurant_id = $1 AND est_actif = true
         ORDER BY jour_semaine ASC, heure_debut ASC`,
        [restaurantId]
    )
}

const listerDisponibles = async (restaurantId, jourSemaine) => {
    return await executer(
        `SELECT * FROM creneaux
         WHERE restaurant_id = $1 AND jour_semaine = $2 AND est_actif = true
         ORDER BY heure_debut ASC`,
        [restaurantId, jourSemaine]
    )
}

const trouverParId = async (id) => {
    const lignes = await executer(
        'SELECT * FROM creneaux WHERE id = $1',
        [id]
    )
    return lignes[0] || null
}

const creer = async (restaurantId, jourSemaine, heureDebut, capaciteMax) => {
    const lignes = await executer(
        `INSERT INTO creneaux (restaurant_id, jour_semaine, heure_debut, capacite_max)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [restaurantId, jourSemaine, heureDebut, capaciteMax]
    )
    return lignes[0]
}

const desactiver = async (id) => {
    await executer(
        'UPDATE creneaux SET est_actif = false WHERE id = $1',
        [id]
    )
}

module.exports = { listerParRestaurant, listerDisponibles, trouverParId, creer, desactiver }