import { Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'

function DesactiveSheetModal({ open, onClose, row }) {
    const { id } = row;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.delete(`/v1/sheets/${id}`).then((response) => {
                if (response.status == 201) {
                    onClose(false)
                    toast.success(`Ficha ${row.status == 'active' ? "desactivado" : "activado"} con exito`);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'>
            <div className='lg:w-1/3 w-[60%] bg-white p-5 rounded-lg flex-col'>
                <div className='flex justify-end'>
                    <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1>¿Estas seguro que quieres {row.status == 'active' ? 'desactivar' : 'activar'} la ficha?</h1>
                    <form method='POST' onSubmit={handleSubmit} className='flex flex-row gap-3'>
                        <button type='submit' className={`p-1 ${row.status == 'active' ? `bg-red-700` : 'bg-green-700'}  text-white rounded hover:scale-105 transition-all`}>{row.status == 'active' ? "Desactivar" : 'Activar'}</button>
                        <button onClick={() => onClose(false)}
                            className={`p-1 ${row.status == 'active' ? `bg-primary` : 'bg-red-700'} text-white rounded hover:scale-105 transition-all`}>Cancelar</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default DesactiveSheetModal