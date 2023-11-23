import { Modal } from '@mui/material'
import React, { useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import handleKeyDown from '../utils/handelKeyDown'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'

function CreateUserModal({ open, onClose }) {
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
            phone: phone.current.value ? phone.current.value : null,
            password: id.current.value
        }

        axiosClient.post("/v1/users", data).then((response) => {
            if (response.status == 200) {
                toast.success("Usuario creado con exito")
                onClose(false)
            } else {
                toast.error("Ha ocurrido un error al crear el usuario")
            }
        })
    }
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'>
            <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
                <div className='flex justify-end'>
                    <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='font-semibold text-primary text-xl'>Crear usuario nuevo</h1>
                    <form method='post' className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-row gap-3 w-full'>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="id">Identificación</label>
                                <input type="number" name='id' placeholder='Número de documento' className='p-2 border border-gray-400 rounded-lg' required onKeyDown={handleKeyDown} ref={id}  />
                            </div>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="name">Nombre Completo</label>
                                <input type="text" name='name' placeholder='Nombre Completo' className='p-2 border border-gray-400 rounded-lg' required ref={name} />
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 w-full'>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="email">Correo</label>
                                <input type="email" name='email' placeholder='Correo Electrónico' className='p-2 border border-gray-400 rounded-lg' required ref={email} />
                            </div>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="phone">Telefono</label>
                                <input type="number" name='phone' placeholder='Teléfono' className='p-2 border border-gray-400 rounded-lg' onKeyDown={handleKeyDown} ref={phone} />
                            </div>
                        </div>
                        <button type='submit' className='py-2 bg-primary text-white rounded-lg hover:scale-105 transition-all'>Crear Usuario</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CreateUserModal