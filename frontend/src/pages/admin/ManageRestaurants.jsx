// frontend/src/pages/admin/ManageRestaurants.jsx

import { useState, useEffect } from 'react'
import { useSelector }         from 'react-redux'
import axios                   from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const formulaireVide = {
    nom:         '',
    description: '',
    adresse:     '',
    telephone:   '',
    email:       '',
    image_url:   '',
}

const ManageRestaurants = () => {
    const { token } = useSelector(state => state.auth)

    const [restaurants,    setRestaurants]    = useState([])
    const [chargement,     setChargement]     = useState(true)
    const [erreur,         setErreur]         = useState(null)
    const [formulaire,     setFormulaire]     = useState(formulaireVide)
    const [restaurantEdit, setRestaurantEdit] = useState(null)
    const [afficherForm,   setAfficherForm]   = useState(false)

    const entete = { headers: { Authorization: `Bearer ${token}` } }

    const chargerRestaurants = async () => {
        try {
            const reponse = await axios.get(`${BASE_URL}/restaurants`)
            setRestaurants(reponse.data.restaurants)
        } catch (err) {
            setErreur('erreur lors du chargement')
        } finally {
            setChargement(false)
        }
    }

    const gererChamp = (e) => {
        setFormulaire({ ...formulaire, [e.target.name]: e.target.value })
    }

    const ouvrirFormulaireAjout = () => {
        setRestaurantEdit(null)
        setFormulaire(formulaireVide)
        setAfficherForm(true)
    }

    const ouvrirFormulaireEdit = (restaurant) => {
        setRestaurantEdit(restaurant)
        setFormulaire({
            nom:         restaurant.nom,
            description: restaurant.description || '',
            adresse:     restaurant.adresse,
            telephone:   restaurant.telephone || '',
            email:       restaurant.email || '',
            image_url:   restaurant.image_url || '',
        })
        setAfficherForm(true)
    }

    const soumettre = async () => {
        try {
            if (restaurantEdit) {
                const reponse = await axios.put(
                    `${BASE_URL}/admin/restaurants/${restaurantEdit.id}`,
                    formulaire,
                    entete
                )
                setRestaurants(restaurants.map(r =>
                    r.id === restaurantEdit.id ? reponse.data.restaurant : r
                ))
            } else {
                const reponse = await axios.post(
                    `${BASE_URL}/admin/restaurants`,
                    formulaire,
                    entete
                )
                setRestaurants([...restaurants, reponse.data.restaurant])
            }
            setAfficherForm(false)
            setFormulaire(formulaireVide)
            setRestaurantEdit(null)
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors de la sauvegarde')
        }
    }

    const supprimer = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/admin/restaurants/${id}`, entete)
            setRestaurants(restaurants.filter(r => r.id !== id))
        } catch (err) {
            setErreur(err.response?.data?.erreur || 'erreur lors de la suppression')
        }
    }

    useEffect(() => {
        chargerRestaurants()
    }, [])

    if (chargement) return <p>Chargement...</p>

    return (
        <div>
            <h1>Gestion des restaurants</h1>

            {erreur && <p>{erreur}</p>}

            <button onClick={ouvrirFormulaireAjout}>
                Ajouter un restaurant
            </button>

            {afficherForm && (
                <div>
                    <h2>{restaurantEdit ? 'Modifier' : 'Ajouter'} un restaurant</h2>

                    <div>
                        <label>Nom</label>
                        <input name="nom" value={formulaire.nom} onChange={gererChamp} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input name="description" value={formulaire.description} onChange={gererChamp} />
                    </div>
                    <div>
                        <label>Adresse</label>
                        <input name="adresse" value={formulaire.adresse} onChange={gererChamp} />
                    </div>
                    <div>
                        <label>Telephone</label>
                        <input name="telephone" value={formulaire.telephone} onChange={gererChamp} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input name="email" value={formulaire.email} onChange={gererChamp} />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input name="image_url" value={formulaire.image_url} onChange={gererChamp} />
                    </div>

                    <button onClick={soumettre}>
                        {restaurantEdit ? 'Modifier' : 'Ajouter'}
                    </button>
                    <button onClick={() => setAfficherForm(false)}>
                        Annuler
                    </button>
                </div>
            )}

            {restaurants.map(restaurant => (
                <div key={restaurant.id}>
                    <h2>{restaurant.nom}</h2>
                    <p>{restaurant.adresse}</p>
                    <p>{restaurant.telephone}</p>

                    <button onClick={() => ouvrirFormulaireEdit(restaurant)}>
                        Modifier
                    </button>
                    <button onClick={() => supprimer(restaurant.id)}>
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ManageRestaurants