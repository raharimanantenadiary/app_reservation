const { executer } = require('../config/db')

const compterReservationsActives = async (creneauId, dateReservation) => {
    const lignes = await executer(
        `SELECT COALESCE(SUM(nb_personnes), 0) AS total
         FROM reservations
         WHERE creneau_id = $1
         AND date_reservation = $2
         AND statut NOT IN ('refusee', 'annulee')`,
        [creneauId, dateReservation]
    )
    return parseInt(lignes[0].total)
}

const creer = async (utilisateurId, restaurantId, creneauId, dateReservation, nbPersonnes) => {
    const lignes = await executer(
        `INSERT INTO reservations (utilisateur_id, restaurant_id, creneau_id, date_reservation, nb_personnes)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [utilisateurId, restaurantId, creneauId, dateReservation, nbPersonnes]
    )
    return lignes[0]
}

const listerParUtilisateur = async (utilisateurId) => {
    return await executer(
        `SELECT r.*, res.nom AS restaurant_nom, res.adresse AS restaurant_adresse,
                c.heure_debut, c.jour_semaine
         FROM reservations r
         JOIN restaurants res ON r.restaurant_id = res.id
         JOIN creneaux c      ON r.creneau_id = c.id
         WHERE r.utilisateur_id = $1
         ORDER BY r.date_reservation DESC`,
        [utilisateurId]
    )
}

const listerToutes = async () => {
    return await executer(
        `SELECT r.*, u.nom AS utilisateur_nom, u.email AS utilisateur_email,
                res.nom AS restaurant_nom, c.heure_debut
         FROM reservations r
         JOIN utilisateurs u  ON r.utilisateur_id = u.id
         JOIN restaurants res ON r.restaurant_id = res.id
         JOIN creneaux c      ON r.creneau_id = c.id
         ORDER BY r.date_reservation DESC`
    )
}

const trouverParId = async (id) => {
    const lignes = await executer(
        'SELECT * FROM reservations WHERE id = $1',
        [id]
    )
    return lignes[0] || null
}

const trouverParQrcodeToken = async (token) => {
    const lignes = await executer(
        'SELECT * FROM reservations WHERE qrcode_token = $1',
        [token]
    )
    return lignes[0] || null
}

const changerStatut = async (id, statut) => {
    const lignes = await executer(
        `UPDATE reservations SET statut = $1 WHERE id = $2 RETURNING *`,
        [statut, id]
    )
    return lignes[0] || null
}

module.exports = {
    compterReservationsActives,
    creer,
    listerParUtilisateur,
    listerToutes,
    trouverParId,
    trouverParQrcodeToken,
    changerStatut,
}