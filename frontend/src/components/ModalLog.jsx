import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../axios-client'
import { Modal } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function ModalLog({ open, onClose, row }) {
    const [element, setElement] = useState([])

    useEffect(() => {
        const getElement = async () => {
            await axiosClient.get("/v1/details").then((response) => {
                setElement(response.data);
                console.log(response.data);
            })
        }

        if (open) {
            getElement();
        }
    }, [open])

    const columns = [
        {
            field: 'date', headerName: 'FECHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.date}`
            }
        }
    ]


    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'>
            <div className='lg:w-[60%] w-[90%] bg-white p-5 rounded-lg flex-col'>
                <div className='flex justify-end'>
                    <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='font-semibold text-primary text-xl'>Historial de existencias del Elemento</h1>
                </div>

                {open && (
                    <Box sx={{ height: 1, width: 1 }}>
                        <DataGrid
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            columns={columns}
                            row={element}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            getRowHeight={() => 'auto'}
                        />
                    </Box>
                )}
            </div>
        </Modal>
    )
}

export default ModalLog