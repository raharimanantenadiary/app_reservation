// frontend/src/api/reservation.api.js

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const creerEntete = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
})

const creer = async (token, donnees) => {
    const reponse = await axios.post(`${BASE_URL}/reservations`, donnees, creerEntete(token))
    return reponse.data
}

const obtenirMesReservations = async (token) => {
    const reponse = await axios.get(`${BASE_URL}/reservations`, creerEntete(token))
    return reponse.data
}

const obtenirParId = async (token, id) => {
    const reponse = await axios.get(`${BASE_URL}/reservations/${id}`, creerEntete(token))
    return reponse.data
}

const annuler = async (token, id) => {
    const reponse = await axios.patch(`${BASE_URL}/reservations/${id}/annuler`, {}, creerEntete(token))
    return reponse.data
}

export default { creer, obtenirMesReservations, obtenirParId, annuler }