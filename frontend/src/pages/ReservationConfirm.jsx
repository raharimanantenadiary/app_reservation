// frontend/src/pages/ReservationConfirm.jsx

import { useState }          from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ajouterReservation }       from '../store/reservationSlice'
import reservationApi               from '../api/reservation.api'

const ReservationConfirm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.auth)

    const {
        restaurantId,
        restaurantNom,
        creneauId,
        dateReservation,
        nbPersonnes,
    } = location.state || {}

    const [chargement,   setChargement]   = useState(false)
    const [erreur,       setErreur]       = useState(null)
    const [qrcode,       setQrcode]       = useState(null)
    const [reservation,  setReservation]  = useState(null)

    const confirmerReservation = async () => {
        setErreur(null)
        setChargement(true)

        try {
            const donnees = await reservationApi.creer(token, {
                restaurant_id:    restaurantId,
                creneau_id:       creneauId,
                date_reservation: dateReservation,
                nb_personnes:     nbPersonnes,
            })

            dispatch(ajouterReservation(donnees.reservation))
            setReservation(donnees.reservation)
            setQrcode(donnees.qrcode)

        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors de la reservation')
        } finally {
            setChargement(false)
        }
    }

    if (!location.state) {
        navigate('/restaurants')
        return null
    }

    if (qrcode && reservation) {
        return (
            <div>
                <h1>Reservation confirmee</h1>
                <p>Votre reservation a ete enregistree avec succes</p>

                <p>Restaurant : {restaurantNom}</p>
                <p>Date : {dateReservation}</p>
                <p>Nombre de personnes : {nbPersonnes}</p>
                <p>Statut : {reservation.statut}</p>

                <h2>Votre QR code</h2>
                <p>Presentez ce QR code a l'accueil du restaurant</p>
                <img src={qrcode} alt="qr code de confirmation" />

                <button onClick={() => navigate('/dashboard')}>
                    Voir mes reservations
                </button>
            </div>
        )
    }

    return (
        <div>
            <h1>Confirmer la reservation</h1>

            <p>Restaurant : {restaurantNom}</p>
            <p>Date : {dateReservation}</p>
            <p>Nombre de personnes : {nbPersonnes}</p>

            {erreur && <p>{erreur}</p>}

            <button onClick={() => navigate(-1)}>
                Retour
            </button>

            <button onClick={confirmerReservation} disabled={chargement}>
                {chargement ? 'En cours...' : 'Confirmer'}
            </button>
        </div>
    )
}

export default ReservationConfirm