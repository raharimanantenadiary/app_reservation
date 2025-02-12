// frontend/src/pages/Dashboard.jsx

import { useState, useEffect }      from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate }              from 'react-router-dom'
import {
    chargementDebut,
    chargementReussi,
    chargementEchec,
    mettreAJourStatut,
} from '../store/reservationSlice'
import reservationApi from '../api/reservation.api'

const couleurStatut = {
    en_attente: 'orange',
    confirmee:  'green',
    refusee:    'red',
    annulee:    'gray',
}

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token, utilisateur }          = useSelector(state => state.auth)
    const { reservations, chargement, erreur } = useSelector(state => state.reservation)

    const [erreurAnnulation, setErreurAnnulation] = useState(null)

    const chargerReservations = async () => {
        dispatch(chargementDebut())

        try {
            const donnees = await reservationApi.obtenirMesReservations(token)
            dispatch(chargementReussi(donnees.reservations))
        } catch (err) {
            dispatch(chargementEchec('erreur lors du chargement des reservations'))
        }
    }

    const annulerReservation = async (id) => {
        setErreurAnnulation(null)

        try {
            const donnees = await reservationApi.annuler(token, id)
            dispatch(mettreAJourStatut(donnees.reservation))
        } catch (err) {
            setErreurAnnulation(err.response?.data?.erreur || 'erreur lors de l\'annulation')
        }
    }

    useEffect(() => {
        chargerReservations()
    }, [])

    if (chargement) return <p>Chargement...</p>
    if (erreur)     return <p>{erreur}</p>

    return (
        <div>
            <h1>Mes reservations</h1>
            <p>Bonjour {utilisateur?.prenom}</p>

            <button onClick={() => navigate('/restaurants')}>
                Faire une nouvelle reservation
            </button>

            {erreurAnnulation && <p>{erreurAnnulation}</p>}

            {reservations.length === 0 && (
                <p>Vous n'avez pas encore de reservation</p>
            )}

            {reservations.map(reservation => (
                <div key={reservation.id}>
                    <h2>{reservation.restaurant_nom}</h2>
                    <p>{reservation.restaurant_adresse}</p>
                    <p>Date : {reservation.date_reservation}</p>
                    <p>Heure : {reservation.heure_debut?.slice(0, 5)}</p>
                    <p>Personnes : {reservation.nb_personnes}</p>
                    <p style={{ color: couleurStatut[reservation.statut] }}>
                        Statut : {reservation.statut}
                    </p>

                    {reservation.statut === 'en_attente' || reservation.statut === 'confirmee' ? (
                        <button onClick={() => annulerReservation(reservation.id)}>
                            Annuler
                        </button>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Dashboard