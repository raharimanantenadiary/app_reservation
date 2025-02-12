const { executer } = require('../config/db')

const listerTous = async () => {
    return await executer(
        'SELECT * FROM restaurants WHERE est_actif = true ORDER BY nom ASC'
    )
}

const trouverParId = async (id) => {
    const lignes = await executer(
        'SELECT * FROM restaurants WHERE id = $1',
        [id]
    )
    return lignes[0] || null
}

const creer = async (nom, description, adresse, telephone, email, imageUrl) => {
    const lignes = await executer(
        `INSERT INTO restaurants (nom, description, adresse, telephone, email, image_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nom, description, adresse, telephone, email, imageUrl]
    )
    return lignes[0]
}

const modifier = async (id, nom, description, adresse, telephone, email, imageUrl) => {
    const lignes = await executer(
        `UPDATE restaurants
         SET nom = $1, description = $2, adresse = $3, telephone = $4, email = $5, image_url = $6
         WHERE id = $7
         RETURNING *`,
        [nom, description, adresse, telephone, email, imageUrl, id]
    )
    return lignes[0] || null
}

const supprimer = async (id) => {
    await executer(
        'UPDATE restaurants SET est_actif = false WHERE id = $1',
        [id]
    )
}

module.exports = { listerTous, trouverParId, creer, modifier, supprimer }