import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear();
        navigate("/auth/signin");
        if (!localStorage.getItem('token')) {
            toast.success("Sesión cerrada con exito!");
        }
    }, []) 
    return null
}


export default Logout