// frontend/src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import authReducer        from './authSlice'
import reservationReducer from './reservationSlice'

const store = configureStore({
    reducer: {
        auth:        authReducer,
        reservation: reservationReducer,
    },
})

export default store