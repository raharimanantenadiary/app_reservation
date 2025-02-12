const fs   = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const { creerPool } = require('../backend/src/config/db')

const lancerMigration = async () => {
    const pool   = creerPool()
    const client = await pool.connect()

    try {
        const cheminFichier = path.join(__dirname, 'migrations', '001_init.sql')
        const contenuSql    = fs.readFileSync(cheminFichier, 'utf8')

        await client.query(contenuSql)
        console.log('migration terminee')

    } catch (erreur) {
        console.error('erreur migration :', erreur.message)
        process.exit(1)

    } finally {
        client.release()
        await pool.end()
    }
}

lancerMigration()