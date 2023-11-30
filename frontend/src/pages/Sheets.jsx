import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { Box } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import axiosClient from '../axios-client'
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import CreateSheetsModal from '../components/CreateSheetsModal'
import EditSheetsModal from '../components/EditSheetsModal'
import { useNavigate } from 'react-router-dom'
import DesactiveSheetModal from '../components/DesactiveSheetModal'

function Sheets() {
    const { user } = useContext(UserContext)
    const [sheets, setSheets] = useState([])
    const [openModalCreateSheet, setOpenModalCreateSheet] = useState(false)
    const [openModalEditSheet, setOpenModalEditSheet] = useState(false)
    const [openModalDesactiveSheet, setOpenModalDesactiveSheet] = useState(false)
    const [row, setRow] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (user.rol == "user") {
            navigate("/home")
        }
    })

    useEffect(() => {
        document.title = "AlmaSENA | Fichas"
        axiosClient.get("/v1/sheets").then((response) => {
            setSheets(response.data)
        })
    }, [openModalCreateSheet, openModalEditSheet, openModalDesactiveSheet])

    const columns = [
        {
            field: 'id', headerName: 'FICHA', flex: 1
        },
        {
            field: 'name', headerName: 'NOMBRE DEL PROGRAMA', flex: 1
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: ({ row }) => [
                <GridActionsCellItem icon={<ArticleIcon />} label="History" title="Historial por fichas" key={row.id} onClick={() => {
                    navigate(`/registro/bysheet/${row.id}/${row.name}`)
                }} />,
                <GridActionsCellItem icon={<EditIcon />} label='Edit' onClick={() => {
                    setRow(row)
                    setOpenModalEditSheet(true)
                }} />,
                <GridActionsCellItem icon={(row.status == 'active') ? <CloseIcon /> : <CheckIcon />} label="Desactive" title={`${row.status == 'active' ? 'Desactivar' : 'Activar'}`} onClick={() => {
                    setRow(row)
                    setOpenModalDesactiveSheet(true)
                }} />
            ]
        }
    ]

    return (
        <>
            <div className='w-full flex flex-row justify-between py-2 items-center'>
                <h1 className='text-primary text-2xl font-bold'>Gestionar fichas</h1>
                {user.rol == 'admin' ? (<button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all' onClick={() => setOpenModalCreateSheet(true)}>+ Crear</button>) : ''}
            </div>
            <CreateSheetsModal open={openModalCreateSheet} onClose={() => setOpenModalCreateSheet(false)} />
            <EditSheetsModal open={openModalEditSheet} onClose={() => setOpenModalEditSheet(false)} row={row} />
            <DesactiveSheetModal open={openModalDesactiveSheet} onClose={() => setOpenModalDesactiveSheet(false)} row={row} />
            <Box>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    rows={sheets}
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
                            paginationModel: { pageSize: 10 }
                        }
                    }}
                    getRowHeight={() => 'auto'}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    getRowClassName={({ row }) => row.status == 'inactive' ? 'bg-red-100' : ''}
                />
            </Box>
        </>
    )
}

export default Sheets