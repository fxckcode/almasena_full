import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
function LogEntry() {
  const { id } = useParams()
  const [log, setLog] = useState([])
  useEffect(() => {
    const getElements = async () => {
      try {
        await axiosClient.get(`/v1/details/byproduct/${parseInt(id)}`).then((response) => {
          setLog(response.data)
          console.log(response.data);
        })
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      getElements()
    }

  }, [])

  const columns = [
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
    {
      field: 'date', headerName: 'FECHA', flex: 1, valueGetter: ({ row }) => {
        return `${row.movements.date.substring(0, 10)}`
      }
    }, {
      field: 'element', headerName: "ELEMENTO", flex: 1, valueGetter: ({ row }) => {
        return `${row.elements.name}`
      }
    }, {
      field: 'categorie', headerName: "CATEGORIA", flex: 1, valueGetter: ({ row }) => {
        return `${row.elements.categories.name}`
      }
    },{
      field: 'brand', headerName: "MARCA", flex: 1, valueGetter: ({ row }) => {
        return `${row.elements.brand}`
      }
    }, {
      field: 'size', headerName: "TALLA", flex: 1, valueGetter: ({ row }) => {
        return `${row.elements.sizes.name}`
      }
    }, {
      field: 'description', headerName: "DESCRIPCION", flex: 1, valueGetter: ({ row}) => {
        return `${row.movements.description}`
      }
    }, {
      field: 'cant', headerName: "CANTIDAD", flex: 1, valueGetter: ({ row }) => {
        return `${row.movements.type == 'entry' ? '+' : '-'} ${row.cant}`
      }
    }
  ]

  return (
    <>
      <a href="/home" className='underline'>{'<'} Volver al inicio</a>
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

export default LogEntry