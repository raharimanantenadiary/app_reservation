// frontend/src/pages/Login.jsx

import { useState }         from 'react'
import { useDispatch }      from 'react-redux'
import { useNavigate }      from 'react-router-dom'
import { connexionReussie } from '../store/authSlice'
import authApi              from '../api/auth.api'

const Login = () => {
    const dispatch  = useDispatch()
    const navigate  = useNavigate()

    const [email,      setEmail]      = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [erreur,     setErreur]     = useState(null)
    const [chargement, setChargement] = useState(false)

    const gererSoumission = async (e) => {
        e.preventDefault()
        setErreur(null)
        setChargement(true)

        try {
            const donnees = await authApi.connecter(email, motDePasse)
            dispatch(connexionReussie(donnees))
            navigate('/')
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur de connexion')
        } finally {
            setChargement(false)
        }
    }

    return (
        <div>
            <h1>Connexion</h1>

            <form onSubmit={gererSoumission}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                </div>

                {erreur && <p>{erreur}</p>}

                <button type="submit" disabled={chargement}>
                    {chargement ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>

            <p>Pas encore de compte ? <a href="/register">S'inscrire</a></p>
        </div>
    )
}

export default Login