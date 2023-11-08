import { Modal } from '@mui/material'
import React, { useRef, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axiosClient from '../axios-client'
import toast from 'react-hot-toast'

function CreateModal({ open, onClose }) {
    const [ categories, setCategories ] = useState([])
    const [ sizes, setSizes ] = useState([])
    const name = useRef(null)
    const categorie = useRef(null)
    const size = useRef(null)
    const brand = useRef(null)
    const color = useRef(null)
    const stock = useRef(null)
    const description = useRef(null)

    useEffect(() => {
        axiosClient.get("/v1/categories").then((response) => {
            setCategories(response.data);
        })
        axiosClient.get("/v1/sizes").then((response) => {
            setSizes(response.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: name.current.value,
            brand: brand.current.value,
            color: color.current.value,
            stock: parseInt(stock.current.value),
            description: description.current.value,
            id_categorie: parseInt(categorie.current.value),
            id_size: parseInt(size.current.value)
        }

        axiosClient.post("/v1/elements", data).then((response) => {
            if (response.status == 200) {
                toast.success("Elemento creado con exito")
                onClose(false)
            }
        })
    }
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'>
            <div className='lg:w-1/2 w-[90%] bg-white p-5 rounded-lg flex-col'>
                <div className='flex justify-end'>
                    <CloseIcon className='hover:text-primary transition-all' onClick={() => onClose()} />
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <h1 className='font-semibold text-primary text-xl'>Crear Elemento</h1>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit} method='POST'>
                        <div className='flex flex-row gap-3 w-full'>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="name">Nombre del Elemento</label>
                                <input type="text" name='name' placeholder='Nombre del elemento' ref={name} className='p-2 border border-gray-400 rounded-lg' required/>
                            </div>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="categories">Categoria</label>
                                <select name='categories' className='p-2 border border-gray-400 rounded-lg' placeholder='Categoria' ref={categorie} required>
                                    <option value="">Seleccionar...</option>
                                    {
                                        categories.map((c, index) => (
                                            <option value={c.id} key={index}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 w-full'>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="sizes">Talla</label>
                                <select name='sizes' className='p-2 border border-gray-400 rounded-lg' placeholder='Talla' ref={size} required>
                                    <option value="">Seleccionar...</option>
                                    {
                                        sizes.map((s, index) => (
                                            <option value={s.id} key={index}>{s.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="brand">Marca</label>
                                <input name='brand' type="text" placeholder='Marca' ref={brand} className='p-2 border border-gray-400 rounded-lg' />
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 w-full'>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="color">Color</label>
                                <input name='color' type="text" placeholder='Color' ref={color} className='p-2 border border-gray-400 rounded-lg' />
                            </div>
                            <div className='flex flex-col gap-3 w-1/2'>
                                <label htmlFor="stock">Existencias</label>
                                <input name='stock' min={0} type="number" placeholder='Existencias disponibles' ref={stock} className='p-2 border border-gray-400 rounded-lg' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <label htmlFor="description">Descripción</label>
                            <textarea name="description" id="" cols="30" rows="2" placeholder='Descripción del elemento' ref={description} className='p-2 border border-gray-400 rounded-lg'></textarea>
                        </div>
                        <button type='submit' className='py-2 bg-primary text-white rounded-lg hover:scale-105 transition-all'>Crear Elemento</button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CreateModal