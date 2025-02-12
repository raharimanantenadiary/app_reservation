const { executer } = require('../config/db')

const trouverParEmail = async (email) => {
    const lignes = await executer(
        'SELECT * FROM utilisateurs WHERE email = $1',
        [email]
    )
    return lignes[0] || null
}

const trouverParId = async (id) => {
    const lignes = await executer(
        'SELECT id, nom, prenom, email, role, cree_le FROM utilisateurs WHERE id = $1',
        [id]
    )
    return lignes[0] || null
}

const creer = async (nom, prenom, email, motDePasseHache) => {
    const lignes = await executer(
        `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nom, prenom, email, role, cree_le`,
        [nom, prenom, email, motDePasseHache]
    )
    return lignes[0]
}

module.exports = { trouverParEmail, trouverParId, creer }