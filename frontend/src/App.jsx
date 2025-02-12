// frontend/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home               from './pages/Home'
import Login              from './pages/Login'
import Register           from './pages/Register'
import RestaurantList     from './pages/RestaurantList'
import RestaurantDetail   from './pages/RestaurantDetail'
import ReservationConfirm from './pages/ReservationConfirm'
import Dashboard          from './pages/Dashboard'

import AdminDashboard        from './pages/admin/AdminDashboard'
import ManageRestaurants     from './pages/admin/ManageRestaurants'
import ManageReservations    from './pages/admin/ManageReservations'
import QRVerify              from './pages/admin/QRVerify'

import Navbar          from './components/common/Navbar'
import ProtectedRoute  from './components/common/ProtectedRoute'

const App = () => {
    const { estConnecte, utilisateur } = useSelector(state => state.auth)

    const estAdmin = estConnecte && utilisateur?.role === 'admin'

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/"               element={<Home />} />
                <Route path="/restaurants"    element={<RestaurantList />} />
                <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                <Route path="/login"          element={estConnecte ? <Navigate to="/" /> : <Login />} />
                <Route path="/register"       element={estConnecte ? <Navigate to="/" /> : <Register />} />

                <Route path="/reservation/confirmation" element={
                    <ProtectedRoute estConnecte={estConnecte}>
                        <ReservationConfirm />
                    </ProtectedRoute>
                }/>

                <Route path="/dashboard" element={
                    <ProtectedRoute estConnecte={estConnecte}>
                        <Dashboard />
                    </ProtectedRoute>
                }/>

                <Route path="/admin" element={
                    <ProtectedRoute estConnecte={estAdmin}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }/>

                <Route path="/admin/restaurants" element={
                    <ProtectedRoute estConnecte={estAdmin}>
                        <ManageRestaurants />
                    </ProtectedRoute>
                }/>

                <Route path="/admin/reservations" element={
                    <ProtectedRoute estConnecte={estAdmin}>
                        <ManageReservations />
                    </ProtectedRoute>
                }/>

                <Route path="/admin/qr-verify" element={
                    <ProtectedRoute estConnecte={estAdmin}>
                        <QRVerify />
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App