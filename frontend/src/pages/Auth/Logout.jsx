import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

function Logout() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    useEffect(() => {
        localStorage.clear();
        navigate("/auth/signin");
        if (!localStorage.getItem('token')) {
            toast.success("Sesión cerrada con exito!");
            setUser({})
        }
    }, []) 
    return null
}


export default Logout