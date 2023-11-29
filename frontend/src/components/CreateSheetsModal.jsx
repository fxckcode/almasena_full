import React, { useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import handleKeyDown from '../utils/handelKeyDown'
import { Modal } from '@mui/material'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'

function CreateSheetsModal({ open, onClose }) {
    const id = useRef(null)
    const name = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            id: id.current.value,
            name: name.current.value
        }

        await axiosClient.post("/v1/sheets", data).then((response) => {
            if (response.status == 200) {
                onClose(false)
                toast.success("Ficha creada con exito!")
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
                    <h1 className='font-semibold text-primary text-xl'>Crear Ficha</h1>
                    <form method='POST' className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="id_sheet">ID FICHA</label>
                            <input type="number" name='id_sheet' placeholder='Número de Ficha' className='p-2 border border-gray-400 rounded-lg' required onKeyDown={handleKeyDown} ref={id} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">Nombre del Programa</label>
                            <input type="text" name='name' placeholder='Nombre Completo' className='p-2 border border-gray-400 rounded-lg' required ref={name} />
                        </div>
                        <button type='submit' className='py-2 bg-primary text-white rounded-lg hover:scale-105 transition-all'>Crear Ficha</button>
                    </form>
                </div>
            </div>
        </Modal>
    )

}

export default CreateSheetsModal