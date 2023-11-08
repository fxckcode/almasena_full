import React, { lazy, useContext } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../axios-client';
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { desactiveToast } from "../customToasts/desactiveToast";
import EditModal from '../components/editModal';
import CreateModal from '../components/CreateModal';
import DesactiveModal from '../components/DesactiveModal';
import UserContext from '../context/UserContext';
import AddStock from '../components/AddStock';

function Home() {
  const [elements, setElements] = useState([]);
  const [ openModalEdit, setOpenModalEdit ] = useState(false)
  const [ openModalCreate, setOpenModalCreate ] = useState(false)
  const [ openModalDesactive, setOpenModalDesactive ] = useState(false)
  const [ row, setRow ] = useState([])
  const { user } = useContext(UserContext)
  useEffect(() => {

    const getElements = async () => {
      await axiosClient.get("/v1/elements").then((response) => {
        setElements(response.data);
      })
    }
    getElements()
    document.title = "AlmaSENA | Inicio"
  }, [openModalEdit, openModalCreate, openModalDesactive])

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
    user.rol == "admin" ? 
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: ({ row }) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => {
          setOpenModalEdit(true)
          setRow(row)
        }} />,
         <GridActionsCellItem icon={(row.state == 'active') ? <CloseIcon /> : <CheckIcon />} label="Desactive" title={`${row.state == 'active' ? 'Desactivar' : 'Activar'}`} onClick={() => {
          setOpenModalDesactive(true)
          setRow(row)
         } } />,
      ],
    }: ''

  ]


  return (
    <>
      <div className='w-full flex flex-row justify-between py-2 items-center'>
        <h1 className='text-primary text-2xl font-satoshi font-semibold'>Inventario</h1>
        { user.rol == 'admin' ? ( <button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all' onClick={() => setOpenModalCreate(true)}>+ Crear</button> ) : '' }
      </div> 
      <EditModal open={openModalEdit} onClose={() => setOpenModalEdit(false)} row={row}/>
      <CreateModal open={openModalCreate} onClose={() => setOpenModalCreate(false)}/>
      <DesactiveModal open={openModalDesactive} onClose={() => setOpenModalDesactive(false)} row={row} />
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
        />
      </Box>
      <AddStock />
    </>
  )
}

export default Home