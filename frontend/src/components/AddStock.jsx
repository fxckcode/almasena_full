import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-client'
import UserContext from '../context/UserContext'
import toast from 'react-hot-toast'

function AddStock({ onSubmitSuccess, openModalDesactive }) {
    const { user } = useContext(UserContext)
    const [elements, setElements] = useState([])
    const [categories, setCategories] = useState([])
    const [ selectCategories, setSelectCategories ] = useState(null)
    const formRef = useRef(null)
    useEffect(() => {
        const getElements = () => {
            axiosClient.get("/v1/elements").then((response) => {
                setElements(response.data)
            })

            axiosClient.get("/v1/categories").then((response) => {
                setCategories(response.data)
            })
        }
        getElements()
    }, [openModalDesactive])

    const element = useRef(null)
    const cant = useRef(null)
    const description = useRef(null)

    const resetForm = () => {
        formRef.current.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            element: element.current.value,
            cant: cant.current.value,
            description: description.current.value,
            id_user: user.id,
            type: "entry"
        }
        axiosClient.post("/v1/movements", data).then((response) => {
            console.log(response);
            toast.success("Existencias agregadas con exito")
            resetForm()
            onSubmitSuccess(true)
        })
    }

    return (
        <div className='w-full p-4 shadow-sm border border-gray-200 rounded'>
            <h2 className='text-primary py-3 font-semibold text-xl'>Agregar existencias nuevas</h2>
            <form method='POST' className='flex flex-col gap-3 items-center' onSubmit={handleSubmit} ref={formRef}>
                <div className='flex flex-row gap-3 w-full'>
                    <div className='flex flex-col gap-3 w-1/3'>
                        <label htmlFor="categories">Categorias</label>
                        <select name="categories" id="categories" className='w-full rounded-lg border border-stroke bg-transparent py-4 px-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' onChange={(e) => setSelectCategories(e.target.value)} required>
                            <option value="">Seleccionar categoria...</option>
                            {
                                categories.map((c, index) => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-3 w-1/2'>
                        <label htmlFor="element">Elemento</label>
                        <select name="element" id="element" className='w-full rounded-lg border border-stroke bg-transparent py-4 px-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' 
                        disabled={ selectCategories == null ? true : false } ref={element} required>
                            <option value="">Seleccionar elemento...</option>
                            {
                                 elements.filter((e) => e.categories.id == selectCategories).map((e, index) => (
                                    <option value={e.id} key={e.id}>{e.name} - {e.sizes.name} - {e.brand}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-3 w-1/3'>
                        <label htmlFor="stock">Cantidad</label>
                        <input name='stock' type="number" className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' placeholder='Cantidad' min={0} ref={cant} required/>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <label htmlFor="description">Descripción</label>
                    <textarea name="description" id="" cols="30" rows="2" className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' placeholder='Descripción' ref={description} required></textarea>
                </div>
                <button type='submit' className='bg-primary p-2 text-white hover:scale-105 transition-all h-min rounded-lg'>Agregar existencias</button>
            </form>
        </div>
    )
}

export default AddStock