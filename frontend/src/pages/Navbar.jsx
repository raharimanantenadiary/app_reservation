// frontend/src/components/common/Navbar.jsx

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link }        from 'react-router-dom'
import { deconnexion }              from '../../store/authSlice'

const Navbar = () => {
    const dispatch  = useDispatch()
    const navigate  = useNavigate()

    const { estConnecte, utilisateur } = useSelector(state => state.auth)

    const estAdmin = estConnecte && utilisateur?.role === 'admin'

    const gererDeconnexion = () => {
        dispatch(deconnexion())
        navigate('/login')
    }

    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/restaurants">Restaurants</Link>

            {estConnecte && !estAdmin && (
                <Link to="/dashboard">Mes reservations</Link>
            )}

            {estAdmin && (
                <>
                    <Link to="/admin">Dashboard admin</Link>
                    <Link to="/admin/restaurants">Restaurants</Link>
                    <Link to="/admin/reservations">Reservations</Link>
                    <Link to="/admin/qr-verify">Scanner QR</Link>
                </>
            )}

            {estConnecte ? (
                <button onClick={gererDeconnexion}>
                    Deconnexion ({utilisateur?.prenom})
                </button>
            ) : (
                <>
                    <Link to="/login">Connexion</Link>
                    <Link to="/register">Inscription</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar