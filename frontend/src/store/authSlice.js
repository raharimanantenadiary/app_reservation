// frontend/src/store/authSlice.js

import { createSlice } from '@reduxjs/toolkit'

const utilisateurStocke = localStorage.getItem('utilisateur')
const tokenStocke       = localStorage.getItem('token')

const etatInitial = {
    utilisateur: utilisateurStocke ? JSON.parse(utilisateurStocke) : null,
    token:       tokenStocke || null,
    estConnecte: !!tokenStocke,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: etatInitial,
    reducers: {
        connexionReussie: (state, action) => {
            state.utilisateur = action.payload.utilisateur
            state.token       = action.payload.token
            state.estConnecte = true
            localStorage.setItem('utilisateur', JSON.stringify(action.payload.utilisateur))
            localStorage.setItem('token', action.payload.token)
        },
        deconnexion: (state) => {
            state.utilisateur = null
            state.token       = null
            state.estConnecte = false
            localStorage.removeItem('utilisateur')
            localStorage.removeItem('token')
        },
    },
})

export const { connexionReussie, deconnexion } = authSlice.actions
export default authSlice.reducer