import React, { useContext, useEffect, useRef } from 'react'
import UserContext from '../context/UserContext'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'
import handleKeyDown from '../utils/handelKeyDown'

function Profile() {
  const { user, setUser } = useContext(UserContext)
  const id = useRef(null)
  const name = useRef(null)
  const email = useRef(null)
  const phone = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: parseInt(id.current.value),
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value
    }

    axiosClient.put(`/v1/users/${user.id}]`, data).then((response) => {
      if (response.status == 200) {
        toast.success("Datos actulizados con exito!!!")
        setUser(response.data)
      }
    })
  }

  useEffect(() => {
    document.title = "AlmaSENA | Perfil"
  }, [])
  return (
    <div className='w-full flex flex-col'>
      <h1 className='text-2xl text-primary font-semibold mb-4'>Datos personales</h1>
      <form className="w-[70%] flex flex-col gap-3" onSubmit={handleSubmit} method='post'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Número de documento</label>
          <input type="number" min={0} className='w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'defaultValue={user.id} required ref={id} placeholder='Número de documento' onKeyDown={handleKeyDown} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Nombre Completo</label>
          <input type="text" className='w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' defaultValue={user.name} required ref={name} placeholder='Nombre Completo' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Correo</label>
          <input type="email" className='w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' defaultValue={user.email} required ref={email} placeholder='Correo SENA' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">Teléfono</label>
          <input type="number" className='w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' defaultValue={user.phone} ref={phone} placeholder='Número de telefono' onKeyDown={handleKeyDown} />
        </div>
        <button className='p-2 text-white bg-primary rounded-lg mx-5 my-5 hover:scale-105 transition-all'>Actualizar datos</button>
      </form>
    </div>
  )
}

export default Profile