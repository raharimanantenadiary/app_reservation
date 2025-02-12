// frontend/src/pages/admin/QRVerify.jsx

import { useState }    from 'react'
import { useSelector } from 'react-redux'
import axios           from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const QRVerify = () => {
    const { token } = useSelector(state => state.auth)

    const [tokenQr,    setTokenQr]    = useState('')
    const [resultat,   setResultat]   = useState(null)
    const [erreur,     setErreur]     = useState(null)
    const [chargement, setChargement] = useState(false)

    const verifier = async () => {
        if (!tokenQr.trim()) return

        setErreur(null)
        setResultat(null)
        setChargement(true)

        try {
            const reponse = await axios.get(
                `${BASE_URL}/qrcode/verifier/${tokenQr.trim()}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setResultat(reponse.data)
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'qrcode invalide')
        } finally {
            setChargement(false)
        }
    }

    const reinitialiser = () => {
        setTokenQr('')
        setResultat(null)
        setErreur(null)
    }

    return (
        <div>
            <h1>Verification QR code</h1>

            <div>
                <label>Coller le token du QR code</label>
                <input
                    type="text"
                    value={tokenQr}
                    onChange={(e) => setTokenQr(e.target.value)}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                />
            </div>

            <button onClick={verifier} disabled={chargement || !tokenQr.trim()}>
                {chargement ? 'Verification...' : 'Verifier'}
            </button>

            <button onClick={reinitialiser}>
                Reinitialiser
            </button>

            {erreur && (
                <div>
                    <p>QR code invalide</p>
                    <p>{erreur}</p>
                </div>
            )}

            {resultat && (
                <div>
                    <p>QR code valide</p>
                    <p>Restaurant : {resultat.reservation.restaurant_id}</p>
                    <p>Date : {resultat.reservation.date_reservation}</p>
                    <p>Personnes : {resultat.reservation.nb_personnes}</p>
                    <p>Statut : {resultat.reservation.statut}</p>
                </div>
            )}
        </div>
    )
}

export default QRVerify