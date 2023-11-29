import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'
import handleKeyDown from '../utils/handelKeyDown'

function ExitsModal({ open, onClose, data, selectedElements, formRef }) {
  const [elements, setElements] = useState([])
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        const elementResponses = await Promise.all(
          selectedElements.map(async (element) => {
            const response = await axiosClient.get(`/v1/elements/${element}`);
            return response.data;
          })
        );

        setElements((prevElements) => [...prevElements, ...elementResponses]);

      } else {
        setElements([])
      }
    }

    fetchData();
  }, [data, selectedElements]);

  useEffect(() => {
    if (open == false) {
      setElements([])
    }
  }, [open])

  const handleQuantityChange = (elementId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [elementId]: quantity,
    }));
  };

  const handleSave = async () => {
    try {
      const dataSubmit = {
        elements,
        quantities,
        ...data
      }

      elements.map((e) => {
        if (parseInt(e.stock) - parseInt(quantities[e.id]) < 0) {
          toast.error("La cantidad sobrepasa el stock actual")
          throw error;
        }

        if (parseInt(quantities[e.id]) == 0) {
          toast.error("La cantidad no puede ser 0")
          throw error;
        }
      })

      await axiosClient.post("/v1/movements/exits", dataSubmit).then((response) => {
        if (response == null) {
          toast.error("Error al generar la salida, puedes que tengas campos vacios o en 0")
        } else if (response.status == 200) {
          toast.success("Salidad generada con exito, elementos actualizados")
          onClose(false)
          formRef.current.reset();
        }
      })

    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  return (
    <Modal open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex justify-center items-center'>
      <div className='lg:w-[65%] w-[90%] bg-white p-5 rounded-lg flex-col max-h-[80vh] overflow-y-auto overflow-x-hidden'>
        <div className='flex justify-end'>
          <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()} />
        </div>
        <div className='w-full flex flex-col gap-5'>
          <h1 className='font-semibold text-primary text-xl'>Resumen de la salida</h1>
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">Elemento</th>
                <th scope="col" className="px-6 py-4">Categoría</th>
                <th scope="col" className="px-6 py-4">Marca</th>
                <th scope="col" className="px-6 py-4">Talla</th>
                <th scope="col" className='px-6 py-4'>Stock Actual</th>
                <th scope="col" className="px-6 py-4">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((element) => (
                <tr key={element.id} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-1 font-semibold">{element.name}</td>
                  <td className="whitespace-nowrap px-6 py-1">{element.categories.name}</td>
                  <td className="whitespace-nowrap px-6 py-1">{element.brand}</td>
                  <td className="whitespace-nowrap px-6 py-1">{element.sizes.name}</td>
                  <td className='whitespace-nowrap px-6 py-1'>{element.stock}</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={quantities[element.id] || 0}
                      onChange={(e) => handleQuantityChange(element.id, e.target.value)}
                      min={0}
                      max={parseInt(element.stock)} className='rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                      onKeyDown={handleKeyDown}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSave} className='bg-primary p-2 text-white rounded-lg hover:scale-105 transition-all'>Guardar</button>
        </div>
      </div>
    </Modal>
  )
}

export default ExitsModal