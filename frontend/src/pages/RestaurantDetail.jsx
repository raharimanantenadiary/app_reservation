// frontend/src/pages/RestaurantDetail.jsx

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector }            from 'react-redux'
import restaurantApi              from '../api/restaurant.api'

const joursTexte = {
    0: 'Lundi',
    1: 'Mardi',
    2: 'Mercredi',
    3: 'Jeudi',
    4: 'Vendredi',
    5: 'Samedi',
    6: 'Dimanche',
}

const RestaurantDetail = () => {
    const { id }   = useParams()
    const navigate = useNavigate()

    const { estConnecte } = useSelector(state => state.auth)

    const [restaurant,  setRestaurant]  = useState(null)
    const [creneaux,    setCreneaux]    = useState([])
    const [chargement,  setChargement]  = useState(true)
    const [erreur,      setErreur]      = useState(null)

    const [dateChoisie,   setDateChoisie]   = useState('')
    const [creneauChoisi, setCreneauChoisi] = useState('')
    const [nbPersonnes,   setNbPersonnes]   = useState(1)
    const [creneauxDuJour, setCreneauxDuJour] = useState([])

    const chargerRestaurant = async () => {
        try {
            const donnees = await restaurantApi.obtenirParId(id)
            setRestaurant(donnees.restaurant)
            setCreneaux(donnees.creneaux)
        } catch (err) {
            setErreur('erreur lors du chargement du restaurant')
        } finally {
            setChargement(false)
        }
    }

    const gererChangementDate = async (date) => {
        setDateChoisie(date)
        setCreneauChoisi('')

        if (!date) {
            setCreneauxDuJour([])
            return
        }

        const jourSemaine = new Date(date).getDay()
        const jourAjuste  = jourSemaine === 0 ? 6 : jourSemaine - 1

        try {
            const donnees = await restaurantApi.obtenirCreneaux(id, jourAjuste)
            setCreneauxDuJour(donnees.creneaux)
        } catch (err) {
            setCreneauxDuJour([])
        }
    }

    const gererReservation = () => {
        if (!estConnecte) {
            navigate('/login')
            return
        }

        navigate('/reservation/confirmation', {
            state: {
                restaurantId:    id,
                restaurantNom:   restaurant.nom,
                creneauId:       creneauChoisi,
                dateReservation: dateChoisie,
                nbPersonnes,
            }
        })
    }

    useEffect(() => {
        chargerRestaurant()
    }, [id])

    if (chargement) return <p>Chargement...</p>
    if (erreur)     return <p>{erreur}</p>
    if (!restaurant) return <p>Restaurant introuvable</p>

    return (
        <div>
            <button onClick={() => navigate('/restaurants')}>Retour</button>

            <h1>{restaurant.nom}</h1>
            <p>{restaurant.description}</p>
            <p>{restaurant.adresse}</p>
            <p>{restaurant.telephone}</p>
            <p>{restaurant.email}</p>

            <h2>Faire une reservation</h2>

            <div>
                <label>Date</label>
                <input
                    type="date"
                    value={dateChoisie}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => gererChangementDate(e.target.value)}
                />
            </div>

            {creneauxDuJour.length > 0 && (
                <div>
                    <label>Creneau horaire</label>
                    <select
                        value={creneauChoisi}
                        onChange={(e) => setCreneauChoisi(e.target.value)}
                    >
                        <option value="">Choisir un creneau</option>
                        {creneauxDuJour.map(creneau => (
                            <option key={creneau.id} value={creneau.id}>
                                {creneau.heure_debut.slice(0, 5)} — {creneau.capacite_max} places max
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {dateChoisie && creneauxDuJour.length === 0 && (
                <p>Aucun creneau disponible ce jour</p>
            )}

            {creneauChoisi && (
                <div>
                    <label>Nombre de personnes</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={nbPersonnes}
                        onChange={(e) => setNbPersonnes(parseInt(e.target.value))}
                    />
                </div>
            )}

            {creneauChoisi && (
                <button onClick={gererReservation}>
                    Reserver
                </button>
            )}
        </div>
    )
}

export default RestaurantDetail