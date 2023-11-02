import React, { useEffect } from 'react'
import { Modal, TextField} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
function EditModal({ open, onClose, row }) {
    useEffect(() => {

    }, [])
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'>
                <div className='w-1/2 bg-white p-5 rounded-lg flex-col'>
                    <div className='flex justify-end'>
                        <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()}/>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <h1 className='font-semibold text-primary text-xl'>Editar Elemento</h1>
                        <form>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" className='w-1/2' value={row.name} />

                        </form>
                    </div>
                </div>
        </Modal>
    )
}

export default EditModal    