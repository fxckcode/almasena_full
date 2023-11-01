import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../axios-client';
import { columnsHome } from '../constants/columnsHome';


function Home() {
    const [elements, setElements] = useState([]);
    useEffect(() => {

      const getElements = async () => {
        await axiosClient.get("/v1/elements").then((response) => {
          setElements(response.data);
        })
      }
      getElements()
      console.log("Se actualizó el componente");
    }, [elements])
  
  return (
    <>
      <div className='w-full flex flex-row justify-between py-2 items-center'>
        <h1 className='text-primary text-2xl font-satoshi font-semibold'>Inventario</h1>
        <button className='p-2 bg-primary rounded-lg text-white hover:scale-105 transition-all'>+ Crear</button>
      </div>
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
    </>
  )
}

export default Home