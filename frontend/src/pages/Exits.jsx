import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ElementsContext from '../context/ElementsContext';
function Exits() {
  const [elements, setElements] = useState([])
  const [users, setUsers] = useState([])
  const { selectedElements, setSelectedElements } = useContext(ElementsContext)
  useEffect(() => {
    const getElements = async () => {
      await axiosClient.get("/v1/elements").then((response) => {
        setElements(response.data);
      }).catch((error) => console.log(error))
    }

    const getUsers = async () => {
      await axiosClient.get("/v1/users").then((response) => {
        setUsers(response.data)
      }).catch((error) => console.log(error))
    }


    getElements()
    getUsers()
  }, [selectedElements])

  const columns = [
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
    { field: 'stock', headerName: 'EXISTENCIAS', flex: 1 }
  ]
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='font-semibold text-2xl text-primary mb-3'>Salidas de elementos</h1>
      <div className='w-full flex flex-col lg:flex-row gap-3'>
        <div className='shadow-lg border-gray-300 border rounded-lg w-full lg:w-1/3'>
          <form action="">
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="">Instructor</label>
              <select name="" id="" className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required>
                <option value="">Seleccionar...</option>
                {
                  users.filter((u) => u.rol != "admin").map((u) => (
                    <option value={u.id} key={u.id}>{u.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="">Ficha</label>
              <input type="number" min={0} placeholder='ID Ficha' className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="">Descripción</label>
              <textarea name="" id="" cols="30" rows="3" placeholder='Descripción de la salida' className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required></textarea>
            </div>
          </form>
        </div>
        <div className='shadow-lg border-gray-300 border rounded-lg w-full'>
          <DataGrid
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            rows={elements}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            getRowHeight={() => 'auto'}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(id) => {
              setSelectedElements(id);
            }}
            rowSelectionModel={selectedElements}
          />
        </div>
      </div>
      <div className='shadow-lg border-gray-300 border rounded-lg w-full p-4 flex flex-col justify-center gap-3 items-center '>
        <h1 className='text-2xl font-semibold text-primary'>Resumen</h1>
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Elemento</th>
              <th scope="col" class="px-6 py-4">Categoría</th>
              <th scope="col" class="px-6 py-4">Marca</th>
              <th scope="col" class="px-6 py-4">Talla</th>
              <th scope="col" class="px-6 py-4">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {
              selectedElements && elements.filter((e) => selectedElements.includes(e.id)).map((e) => (
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-1 font-semibold">{e.name}</td>
                  <td class="whitespace-nowrap px-6 py-1">{e.categories.name}</td>
                  <td class="whitespace-nowrap px-6 py-1">{e.brand}</td>
                  <td class="whitespace-nowrap px-6 py-1">{e.sizes.name}</td>
                  <td class="whitespace-nowrap px-6 py-1">
                    <input type="number" min={0} defaultValue={0} max={parseInt(e.stock)} className='rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button className='p-2 bg-primary text-white rounded w-1/4 hover:scale-105 transition-all'>Crear salida</button>
      </div>
    </div>
  )
}

export default Exits