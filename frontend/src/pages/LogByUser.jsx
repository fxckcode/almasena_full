import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function LogByUser() {
    const { id } = useParams()
    const [log, setLog] = useState([])

    useEffect(() => {
        const getLog = async () => {
            try {
                await axiosClient.get(`/v1/details/byuser/${parseInt(id)}`).then((response) => {
                    setLog(response)
                    console.log(response.data);
                })
            } catch (error) {
                console.error(error);
            }
        }
        if (id) {
            getLog()
        }
    }, [])

    const columns = [
        {
            field: 'date', headerName: 'FECHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.date.substring(0, 10)}`
            }
        },
        {
            field: "users", headerName: 'RESPONSABLE', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.users.name}`
            }
        },
        {
            field: "sheet", headerName: 'FICHA', flex: 1, valueGetter: ({ row }) => {
                return `${row.movements.sheet == null ? '' : row.movements.sheet}`
            }
        },
    ]
    return (
        <>
            <a href="/users" className='underline'>{'<'} Volver al inicio</a>
            <h1 className='font-semibold text-xl text-primary mb-3'>Historial de movimientos del elemento</h1>
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
                    getRowClassName={({ row }) => row.movements.type == 'entry' ? 'bg-green-100' : 'bg-red-100'}
                />
            </Box>
        </>
    )
}

export default LogByUser