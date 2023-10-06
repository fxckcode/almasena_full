import React, { useRef, useEffect } from 'react'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const id = useRef(null)
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()
        const data = {
            id: id.current.value,
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        }

        axiosClient.post("/auth/register", data).then((response) => {
            var { token } = response.data
            if (token) {
              localStorage.setItem('token', token)
              navigate("/home")
            } else if (response.data == 403) {
              alert("Credenciales erroneas")
            }
          }).catch((error) => {
            console.log("Error", error);
          })
    }
    useEffect(() => {
        document.title = 'AlmaSENA | Registro'
      }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='shadow-lg rounded bg-gray-100 py-3 px-10  lg:w-[35%] md:w-[50%] w-[90%]'>
                <h1 className='text-green-800 font-bold text-2xl text-center mb-5'>AlmaSENA</h1>
                <h2 className='text-center font-bold'>Crear cuenta</h2>
                <form className='flex flex-col' action='#' method='post'>
                    <div className='flex flex-col gap-3 mb-4'>
                        <label htmlFor="id">N. Documento</label>
                        <input type="number" name='id' placeholder='Numero de documento' className='p-2 rounded outline-slate-400' required  ref={id} />
                    </div>
                    <div className='flex flex-col gap-3 mb-4'>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' placeholder='Nombre' className='p-2 rounded outline-slate-400' required  ref={name} />
                    </div>
                    <div className='flex flex-col gap-3 mb-4'>
                        <label htmlFor="email">Correo</label>
                        <input type="email" name='email' placeholder='Correo Electrónico' className='p-2 rounded outline-slate-400' required ref={email} />
                    </div>
                    <div className='flex flex-col gap-3 mb-12'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name='password' placeholder='Contraseña' className='p-2 rounded outline-slate-400' required ref={password} />
                    </div>
                    <button className='w-full p-2 bg-green-900 text-white rounded hover:bg-green-700 transition-colors mb-4' onClick={handleSignUp}>Registrarse</button>
                    <p className='text-center mb-4'>o</p>
                    <a href="/" className='underline hover:text-green-900 transition-all text-md text-center'>Iniciar sesión</a>
                </form>
            </div>
        </div>
    )
}

export default SignUp