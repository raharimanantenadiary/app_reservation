const { Pool } = require('pg')

const configurationBase = {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}

const creerPool = () => new Pool(configurationBase)

const pool = creerPool()

const testerConnexion = async () => {
    try {
        const client = await pool.connect()
        console.log('connexion postgresql etablie')
        client.release()
    } catch (erreur) {
        console.error('echec connexion postgresql :', erreur.message)
        process.exit(1)
    }
}

testerConnexion()

const executer = async (requete, parametres = []) => {
    const resultat = await pool.query(requete, parametres)
    return resultat.rows
}

module.exports = { pool, executer, creerPool }