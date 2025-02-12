// frontend/src/pages/admin/ManageReservations.jsx

import { useState, useEffect } from 'react'
import { useSelector }         from 'react-redux'
import axios                   from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const couleurStatut = {
    en_attente: 'orange',
    confirmee:  'green',
    refusee:    'red',
    annulee:    'gray',
}

const ManageReservations = () => {
    const { token } = useSelector(state => state.auth)

    const [reservations, setReservations] = useState([])
    const [chargement,   setChargement]   = useState(true)
    const [erreur,       setErreur]       = useState(null)

    const entete = { headers: { Authorization: `Bearer ${token}` } }

    const chargerReservations = async () => {
        try {
            const reponse = await axios.get(`${BASE_URL}/admin/reservations`, entete)
            setReservations(reponse.data.reservations)
        } catch (err) {
            setErreur('erreur lors du chargement des reservations')
        } finally {
            setChargement(false)
        }
    }

    const valider = async (id) => {
        try {
            const reponse = await axios.patch(
                `${BASE_URL}/admin/reservations/${id}/valider`,
                {},
                entete
            )
            setReservations(reservations.map(r =>
                r.id === id ? reponse.data.reservation : r
            ))
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors de la validation')
        }
    }

    const refuser = async (id) => {
        try {
            const reponse = await axios.patch(
                `${BASE_URL}/admin/reservations/${id}/refuser`,
                {},
                entete
            )
            setReservations(reservations.map(r =>
                r.id === id ? reponse.data.reservation : r
            ))
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors du refus')
        }
    }

    useEffect(() => {
        chargerReservations()
    }, [])

    if (chargement) return <p>Chargement...</p>
    if (erreur)     return <p>{erreur}</p>

    return (
        <div>
            <h1>Gestion des reservations</h1>

            {reservations.length === 0 && (
                <p>Aucune reservation</p>
            )}

            {reservations.map(reservation => (
                <div key={reservation.id}>
                    <h2>{reservation.restaurant_nom}</h2>
                    <p>Client : {reservation.utilisateur_nom} — {reservation.utilisateur_email}</p>
                    <p>Date : {reservation.date_reservation}</p>
                    <p>Heure : {reservation.heure_debut?.slice(0, 5)}</p>
                    <p>Personnes : {reservation.nb_personnes}</p>
                    <p style={{ color: couleurStatut[reservation.statut] }}>
                        Statut : {reservation.statut}
                    </p>

                    {reservation.statut === 'en_attente' && (
                        <>
                            <button onClick={() => valider(reservation.id)}>
                                Valider
                            </button>
                            <button onClick={() => refuser(reservation.id)}>
                                Refuser
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ManageReservations