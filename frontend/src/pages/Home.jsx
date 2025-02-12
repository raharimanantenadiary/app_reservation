// frontend/src/pages/Home.jsx

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Bienvenue sur App Reservation</h1>
            <p>Reservez votre table dans les meilleurs restaurants</p>

            <button onClick={() => navigate('/restaurants')}>
                Voir les restaurants
            </button>
        </div>
    )
}

export default Home