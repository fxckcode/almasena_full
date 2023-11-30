import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import CreateUserModal from '../components/CreateUserModal';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import EditUserModal from '../components/EditUserModal';
import UserContext from '../context/UserContext';

function Users() {
    const [users, setUsers] = useState([])
    const [openModalCreateUser, setOpenModalCreateUser] = useState(false)
    const [openModalEditUser, setOpenModalEditUser] = useState(false)
    const navigate = useNavigate()
    const [row, setRow] = useState({})
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user.rol == "user") {
            navigate("/home")
        }

        document.title = "AlmaSENA | Usuarios"
    })

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
    }, [openModalCreateUser, openModalEditUser])

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
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<ArticleIcon />}
                    label="History"
                    title="Historia de existencias"
                    onClick={() => {
                        navigate(`/registro/byuser/${parseInt(row.id)}/${row.name}`)
                    }}
                />,
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => {
                        setRow(row)
                        setOpenModalEditUser(true)
                    }}
                />
            ]
        },

    ]
    return (
        <>
            <div className='w-full flex flex-row justify-between py-2 items-center'>
                <h1 className='text-primary text-2xl font-satoshi font-semibold'>Usuarios</h1>
                <button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all' onClick={() => setOpenModalCreateUser(true)}>+ Crear</button>
            </div>
            <CreateUserModal open={openModalCreateUser} onClose={() => setOpenModalCreateUser(false)} />
            <EditUserModal open={openModalEditUser} onClose={() => setOpenModalEditUser(false)} row={row} />
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
                            printOptions: {
                                disableToolbarButton: true,
                            },
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25 }
                        }
                    }}
                    getRowHeight={() => 'auto'}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                />
            </Box>

        </>
    )
}

export default Users