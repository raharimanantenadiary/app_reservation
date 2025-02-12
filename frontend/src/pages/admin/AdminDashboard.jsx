// frontend/src/pages/admin/AdminDashboard.jsx

import { useState, useEffect } from 'react'
import { useSelector }         from 'react-redux'
import { useNavigate }         from 'react-router-dom'
import axios                   from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.auth)

    const [statistiques, setStatistiques] = useState(null)
    const [chargement,   setChargement]   = useState(true)
    const [erreur,       setErreur]       = useState(null)

    const chargerStatistiques = async () => {
        try {
            const reponse = await axios.get(`${BASE_URL}/admin/statistiques`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setStatistiques(reponse.data)
        } catch (err) {
            setErreur('erreur lors du chargement des statistiques')
        } finally {
            setChargement(false)
        }
    }

    useEffect(() => {
        chargerStatistiques()
    }, [])

    if (chargement) return <p>Chargement...</p>
    if (erreur)     return <p>{erreur}</p>

    return (
        <div>
            <h1>Dashboard admin</h1>

            <h2>Aujourd'hui</h2>

            <p>Reservations du jour : {statistiques?.reservations_du_jour}</p>
            <p>Confirmees : {statistiques?.statistiques?.confirmees}</p>
            <p>En attente : {statistiques?.statistiques?.en_attente}</p>
            <p>Annulees : {statistiques?.statistiques?.annulees}</p>
            <p>Refusees : {statistiques?.statistiques?.refusees}</p>
            <p>Total : {statistiques?.statistiques?.total}</p>

            <h2>Gestion</h2>

            <button onClick={() => navigate('/admin/restaurants')}>
                Gerer les restaurants
            </button>

            <button onClick={() => navigate('/admin/reservations')}>
                Gerer les reservations
            </button>

            <button onClick={() => navigate('/admin/qr-verify')}>
                Scanner un QR code
            </button>
        </div>
    )
}

export default AdminDashboard