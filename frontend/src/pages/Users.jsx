import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CreateUserModal from '../components/CreateUserModal';

function Users() {
    const [users, setUsers] = useState([])
    const [openModalCreateUser, setOpenModalCreateUser] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            try {
                await axiosClient.get("/v1/users").then((response) => {
                    setUsers(response.data);
                })
            } catch (error) {
                console.error(error);
            }
        }

        getUser()
    }, [openModalCreateUser])

    const columns = [
        {
            field: 'id', headerName: 'IDENTIFICACION', flex: 1
        },
        {
            field: 'name', headerName: 'NOMBRE', flex: 1
        },
        {
            field: 'email', headerName: 'CORREO', flex: 1
        },
        {
            field: 'phone', headerName: 'TELEFONO', flex: 1
        }
    ]
    return (
        <>
            <div className='w-full flex flex-row justify-between py-2 items-center'>
                <h1 className='text-primary text-2xl font-satoshi font-semibold'>Usuarios</h1>
                <button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all' onClick={() => setOpenModalCreateUser(true)}>+ Crear</button>
            </div>
            <CreateUserModal open={openModalCreateUser} onClose={() => setOpenModalCreateUser(false)} />
            <Box sx={{ height: 1, width: 1 }}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    rows={users.filter((u) => u.rol == 'user')}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    getRowHeight={() => 'auto'}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                />
            </Box>

        </>
    )
}

export default Users