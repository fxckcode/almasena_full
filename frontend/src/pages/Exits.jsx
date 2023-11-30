import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ExitsModal from '../components/ExitsModal';
import toast from 'react-hot-toast';
import handleKeyDown from '../utils/handelKeyDown';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Exits() {
  const [elements, setElements] = useState([])
  const [users, setUsers] = useState([])
  const [selectedElements, setSelectedElements] = useState([])
  const [openModalExit, setOpenModalExit] = useState(false)
  const [data, setData] = useState([])
  const [ sheets, setSheets ] = useState([])
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user.rol == "user") {
      navigate("/home")
    }
  })


  useEffect(() => {
    const getElements = async () => {
      try {
        await axiosClient.get("/v1/elements").then((response) => {
          const activeElement = response.data.filter((e) => e.state == "active")
          setElements(activeElement);
        }).catch((error) => console.log(error))
      } catch (error) {
        console.error(error);
      }
    }
    document.title = "AlmaSENA | Salidas"
    const getUsers = async () => {
      try {
        await axiosClient.get("/v1/users").then((response) => {
          setUsers(response.data)
        }).catch((error) => console.log(error))
      } catch (error) {
        console.error(error);
      }
    }

    const getSheets = async () => {
      try {
        await axiosClient.get("/v1/sheets").then((response) => {
          setSheets(response.data)
        }).catch((error) => console.log(error))
      } catch (error) { 
        console.error(error);
      }
    }

    getSheets()
    getElements()
    getUsers()
  }, [selectedElements, openModalExit])

  const selectedUser = useRef(null)
  const sheet = useRef(null)
  const description = useRef(null)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedElements.length > 0) {
      const data = {
        selectedUser: selectedUser.current.value,
        sheet: sheet.current.value,
        description: description.current.value
      }

      setData(data)
      setOpenModalExit(true)

    } else {
      toast.error("Tienes que selecionar al menos un elemento")
    }
  }

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
          <form method='post' onSubmit={handleSubmit} ref={formRef}>
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="user">Instructor</label>
              <select name="user" id="user" className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required ref={selectedUser}>
                <option value="">Seleccionar...</option>
                {
                  users.filter((u) => u.rol != "admin").map((u, index) => (
                    <option value={u.id} key={index}>{u.name} - {u.id}</option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="sheet">Ficha</label>
              <select name="sheet" id="sheet" className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required ref={sheet}>
                <option value="">Seleccionar...</option>
                {
                  sheets.filter((s) => s.status == 'active').map((s, index) => (
                    <option value={s.id} key={index}>{s.id}</option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <label htmlFor="description">Descripción</label>
              <textarea name="description" id="description" cols="30" rows="3" placeholder='Descripción de la salida' className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required ref={description}></textarea>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <button type='submit' className='w-full p-2 rounded-lg hover:scale-105 transition-all bg-primary text-white'>Crear salida</button>
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
                printOptions: {
                  disableToolbarButton: true,
                },
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
      <ExitsModal open={openModalExit} onClose={() => setOpenModalExit(false)} data={data} selectedElements={selectedElements} formRef={formRef} />
    </div>
  )
}

export default Exits