import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UserContext from '../context/UserContext';

function LogBySheet() {
    const { id, name } = useParams()
    const [log, setLog] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.rol == "user") {
            navigate("/home")
        }
    }) 

    useEffect(() => {
        const getLog = async () => {
            try {
                await axiosClient.get(`/v1/details/bysheet/${parseInt(id)}`).then((response) => {
                    setLog(response.data)
                    
                })
            } catch (error) {
                console.error(error);
            }
        }
        getLog()
        document.title = "AlmaSENA | Historico por Usuario"
    }, [])

    const columns = [
        {
            field: 'date', headerName: 'FECHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.date.substring(0, 10)}`
            }
        },
        {
            fied: 'name', headerName: 'RESPONSABLE', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.users.name}`
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
            <a href="/sheets" className='underline'>{'<'} Volver al inicio</a>
            <h1 className='font-semibold text-2xl text-primary mb-3'>Historial de movimiento por ID de Ficha</h1>
            <h2 className='mb-3'>ID Ficha: { id }</h2>
            <h2 className='mb-5'>Nombre del Programa: { name }</h2>
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

export default LogBySheet