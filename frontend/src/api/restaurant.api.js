// frontend/src/api/restaurant.api.js

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const obtenirTous = async () => {
    const reponse = await axios.get(`${BASE_URL}/restaurants`)
    return reponse.data
}

const obtenirParId = async (id) => {
    const reponse = await axios.get(`${BASE_URL}/restaurants/${id}`)
    return reponse.data
}

const obtenirCreneaux = async (restaurantId, jourSemaine) => {
    const reponse = await axios.get(`${BASE_URL}/restaurants/${restaurantId}/creneaux`, {
        params: { jour_semaine: jourSemaine },
    })
    return reponse.data
}

export default { obtenirTous, obtenirParId, obtenirCreneaux }