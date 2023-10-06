import React, { useEffect, useRef } from 'react'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom'

function Login() {
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      email: email.current.value,
      password: password.current.value
    }
    axiosClient.post('/auth/login', data).then((response) => {
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
    document.title = 'AlmaSENA | Iniciar Sesión'
  }, [])
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='shadow-lg rounded bg-gray-100 py-6 px-10 lg:w-[35%] md:w-[50%] w-[90%]'>
        <h1 className='text-green-800 font-bold text-2xl text-center mb-5'>AlmaSENA</h1>
        <h2 className='text-center font-bold'>Iniciar Sesión</h2>
        <form className='flex flex-col' action='#' method='post'>
          <div className='flex flex-col gap-3 mb-4'>
            <label htmlFor="email">Correo</label>
            <input type="email" name='email' placeholder='Correo Electrónico' className='p-2 rounded outline-slate-400' required ref={email} />
          </div>
          <div className='flex flex-col gap-3 mb-16'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name='password' placeholder='Contraseña' className='p-2 rounded outline-slate-400' required ref={password} />
          </div>
          <button className='w-full p-2 bg-green-900 text-white rounded hover:bg-green-700 transition-colors' onClick={handleSubmit} type='submit'>Iniciar Sesión</button>
          <div className='w-full flex justify-between py-6'>
            <a href="#" className='underline hover:text-green-900 transition-all text-sm'>Olvidaste la contraseña?</a>
            <a href="/register" className='underline hover:text-green-900 transition-all text-sm'>Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login