// frontend/src/api/auth.api.js

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const inscrire = async (nom, prenom, email, motDePasse) => {
    const reponse = await axios.post(`${BASE_URL}/auth/inscription`, {
        nom,
        prenom,
        email,
        mot_de_passe: motDePasse,
    })
    return reponse.data
}

const connecter = async (email, motDePasse) => {
    const reponse = await axios.post(`${BASE_URL}/auth/connexion`, {
        email,
        mot_de_passe: motDePasse,
    })
    return reponse.data
}

const obtenirProfil = async (token) => {
    const reponse = await axios.get(`${BASE_URL}/auth/profil`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return reponse.data
}

export default { inscrire, connecter, obtenirProfil }