// frontend/src/store/reservationSlice.js

import { createSlice } from '@reduxjs/toolkit'

const etatInitial = {
    reservations: [],
    chargement:   false,
    erreur:       null,
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState: etatInitial,
    reducers: {
        chargementDebut: (state) => {
            state.chargement = true
            state.erreur     = null
        },
        chargementReussi: (state, action) => {
            state.chargement  = false
            state.reservations = action.payload
        },
        chargementEchec: (state, action) => {
            state.chargement = false
            state.erreur     = action.payload
        },
        ajouterReservation: (state, action) => {
            state.reservations.unshift(action.payload)
        },
        mettreAJourStatut: (state, action) => {
            const index = state.reservations.findIndex(r => r.id === action.payload.id)
            if (index !== -1) {
                state.reservations[index] = action.payload
            }
        },
    },
})

export const {
    chargementDebut,
    chargementReussi,
    chargementEchec,
    ajouterReservation,
    mettreAJourStatut,
} = reservationSlice.actions

export default reservationSlice.reducer