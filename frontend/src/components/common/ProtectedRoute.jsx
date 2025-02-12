// frontend/src/components/common/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ estConnecte, children }) => {
    if (!estConnecte) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute