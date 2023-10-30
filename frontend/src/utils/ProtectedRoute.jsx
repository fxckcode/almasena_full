import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
function ProtectedRoute() {
    const auth = window.localStorage.getItem('token');
    return (
        auth ? <Outlet/> : <Navigate to="/auth/signin" />
    )
}

export default ProtectedRoute