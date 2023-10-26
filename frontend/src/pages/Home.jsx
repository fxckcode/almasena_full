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
        console.log(response.data);
      })
    }
    getElements()

  }, [])
  
  return (
    <>
      <h1>Inventario</h1>
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
        />
      </Box>
    </>
  )
}

export default Home