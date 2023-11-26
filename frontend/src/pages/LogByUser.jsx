import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function LogByUser() {
    const { id, name } = useParams()
    const [log, setLog] = useState([])
    const [ idUser, setIdUser ] = useState('')
    const [ nameUser, setNameUser ] = useState('')

    useEffect(() => {
        const getLog = async () => {
            try {
                await axiosClient.get(`/v1/details/byuser/${parseInt(id)}`).then((response) => {
                    setLog(response.data)
                    
                })
            } catch (error) {
                console.error(error);
            }
        }
        getLog()
    }, [])

    const columns = [
        {
            field: 'date', headerName: 'FECHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.date.substring(0, 10)}`
            }
        },
        {
            field: "sheet", headerName: 'FICHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.sheet == null ? '' : row.movements.sheet}`
            }
        },
        {
            field: 'element', headerName: "ELEMENTO", flex: 1, valueGetter: ({ row }) => {
                return `${row.elements.name}`
            }
        }, {
            field: 'categorie', headerName: "CATEGORIA", flex: 1, valueGetter: ({ row }) => {
                return `${row.elements.categories.name}`
            }
        }, {
            field: 'brand', headerName: "MARCA", flex: 1, valueGetter: ({ row }) => {
                return `${row.elements.brand}`
            }
        }, {
            field: 'size', headerName: "TALLA", flex: 1, valueGetter: ({ row }) => {
                return `${row.elements.sizes.name}`
            }
        }, {
            field: 'description', headerName: "DESCRIPCION", flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.description}`
            }
        }, {
            field: 'cant', headerName: "CANTIDAD", flex: 1, valueGetter: ({ row }) => {
                return `${row.cant}`
            }
        }
    ]
    return (
        <>
            <a href="/users" className='underline'>{'<'} Volver al inicio</a>
            <h1 className='font-semibold text-2xl text-primary mb-3'>Historial de movimiento por Usuario</h1>
            <h2 className='mb-3'>Documento: { id }</h2>
            <h2 className='mb-5'>Usuario: { name }</h2>
            <Box sx={{ height: 1, width: 1 }}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    rows={log}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    getRowHeight={() => 'auto'}
                />
            </Box>
        </>
    )
}

export default LogByUser