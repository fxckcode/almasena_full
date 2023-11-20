import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
function AdminRoute() {
    const { user } = useContext(UserContext)
    return (
        user.rol == "admin" ? <Outlet/> : <Navigate to="/home" />
    )
}

export default AdminRoute