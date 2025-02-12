// database/seed.js

const fs   = require('fs')
const path = require('path')
const { Pool } = require('pg')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const pool = new Pool({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

const lancerSeed = async () => {
    const client = await pool.connect()

    try {
        const chemin     = path.join(__dirname, 'seeds', 'seed.sql')
        const contenuSql = fs.readFileSync(chemin, 'utf8')

        await client.query(contenuSql)
        console.log('seed termine')

    } catch (erreur) {
        console.error('erreur seed :', erreur.message)
        process.exit(1)

    } finally {
        client.release()
        await pool.end()
    }
}

lancerSeed()