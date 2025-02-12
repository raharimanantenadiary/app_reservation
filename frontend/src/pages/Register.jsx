// frontend/src/pages/Register.jsx

import { useState }         from 'react'
import { useDispatch }      from 'react-redux'
import { useNavigate }      from 'react-router-dom'
import { connexionReussie } from '../store/authSlice'
import authApi              from '../api/auth.api'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nom,        setNom]        = useState('')
    const [prenom,     setPrenom]     = useState('')
    const [email,      setEmail]      = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [erreur,     setErreur]     = useState(null)
    const [chargement, setChargement] = useState(false)

    const gererSoumission = async (e) => {
        e.preventDefault()
        setErreur(null)
        setChargement(true)

        try {
            const donnees = await authApi.inscrire(nom, prenom, email, motDePasse)
            dispatch(connexionReussie(donnees))
            navigate('/')
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors de l\'inscription')
        } finally {
            setChargement(false)
        }
    }

    return (
        <div>
            <h1>Inscription</h1>

            <form onSubmit={gererSoumission}>
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Prenom</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>

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
                    {chargement ? 'Inscription...' : 'S\'inscrire'}
                </button>
            </form>

            <p>Deja un compte ? <a href="/login">Se connecter</a></p>
        </div>
    )
}

export default Register