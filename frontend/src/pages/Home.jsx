import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../axios-client';
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import EditModal from '../components/editModal';
import CreateModal from '../components/CreateModal';
import DesactiveModal from '../components/DesactiveModal';
import UserContext from '../context/UserContext';
import AddStock from '../components/AddStock';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [elements, setElements] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalDesactive, setOpenModalDesactive] = useState(false)
  const [row, setRow] = useState([])
  const { user } = useContext(UserContext)
  const [ update, setUpdate ] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {

    const getElements = async () => {
      try {
        await axiosClient.get("/v1/elements").then((response) => {
          setElements(response.data);
        })
      } catch (error) {
        console.error(error);
      }
    }
    getElements()
    document.title = "AlmaSENA | Inicio"
  }, [openModalEdit, openModalCreate, openModalDesactive, update])

  const columnsHome = [
    { field: 'name', headerName: "NOMBRE", flex: 1 },
    {
      field: 'categories', headerName: 'CATEGORIA', flex: 1, valueGetter: ({ row }) => {
        return `${row.categories.name}`
      },
    },
    {
      field: 'sizes', headerName: 'TALLA', flex: 1, valueGetter: ({ row }) => {
        return `${row.sizes.name}`
      }
    },
    { field: 'brand', headerName: 'MARCA', flex: 1 },
    { field: 'color', headerName: 'COLOR', flex: 1 },
    { field: 'stock', headerName: 'EXISTENCIAS', flex: 1 },
    { field: 'description', headerName: 'DESCRIPCION', flex: 1 },
    { field: 'updated_at', headerName: 'FECHA'},
    user.rol == "admin" ?
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: ({ row }) => [
          <GridActionsCellItem icon={<ArticleIcon/>} label="History" title="Historia de existencias"
            onClick={() => {
              navigate(`/registro/${row.id}`)
            }} />,
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => {
            setOpenModalEdit(true)
            setRow(row)
          }} />,
          row.stock > 0 ?
          <GridActionsCellItem icon={(row.state == 'active') ? <CloseIcon /> : <CheckIcon />} label="Desactive" title={`${row.state == 'active' ? 'Desactivar' : 'Activar'}`} onClick={() => {
            setOpenModalDesactive(true)
            setRow(row)
          }} /> : <p></p>,
          
        ],
      } : ''

  ]


  return (
    <>
      <div className='w-full flex flex-row justify-between py-2 items-center'>
        <h1 className='text-primary text-2xl font-satoshi font-semibold'>Inventario</h1>
        {user.rol == 'admin' ? (<button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all' onClick={() => setOpenModalCreate(true)}>+ Crear</button>) : ''}
      </div>
      <EditModal open={openModalEdit} onClose={() => setOpenModalEdit(false)} row={row} />
      <CreateModal open={openModalCreate} onClose={() => setOpenModalCreate(false)} />
      <DesactiveModal open={openModalDesactive} onClose={() => setOpenModalDesactive(false)} row={row} />
      <div className='flex flex-col gap-3'>
        <Box sx={{ height: 1, width: 1 }}>
          <DataGrid
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columnsHome}
            rows={elements}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            getRowHeight={() => 'auto'}
            getRowClassName={({ row }) => row.state == 'inactive' ? 'bg-red-100' : ''}
            initialState={{
              sorting: {
                sortModel: [{ field: 'updated_at', sort: 'desc' }],
              },
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            columnVisibilityModel={{
              updated_at: false
            }}
          />
        </Box>
        { user.rol == 'admin' ? (<AddStock openModalDesactive={openModalDesactive}  onSubmitSuccess={() => setUpdate(!update)} />) : ''}
        
      </div>
    </>
  )
}

export default Home