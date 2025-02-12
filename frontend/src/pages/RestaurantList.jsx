// frontend/src/pages/RestaurantList.jsx

import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'
import restaurantApi           from '../api/restaurant.api'

const RestaurantList = () => {
    const navigate = useNavigate()

    const [restaurants, setRestaurants] = useState([])
    const [chargement,  setChargement]  = useState(true)
    const [erreur,      setErreur]      = useState(null)

    const chargerRestaurants = async () => {
        try {
            const donnees = await restaurantApi.obtenirTous()
            setRestaurants(donnees.restaurants)
        } catch (err) {
            setErreur('erreur lors du chargement des restaurants')
        } finally {
            setChargement(false)
        }
    }

    useEffect(() => {
        chargerRestaurants()
    }, [])

    if (chargement) return <p>Chargement...</p>
    if (erreur)     return <p>{erreur}</p>

    return (
        <div>
            <h1>Restaurants</h1>

            {restaurants.length === 0 && (
                <p>Aucun restaurant disponible</p>
            )}

            {restaurants.map(restaurant => (
                <div key={restaurant.id}>
                    <h2>{restaurant.nom}</h2>
                    <p>{restaurant.description}</p>
                    <p>{restaurant.adresse}</p>
                    <p>{restaurant.telephone}</p>

                    <button onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                        Voir le detail
                    </button>
                </div>
            ))}
        </div>
    )
}

export default RestaurantList