import React from 'react'

function AddStock() {
    return (
        <div className='w-1/2'>
            <h2 className='text-primary py-3 font-semibold text-xl'>Agregar existencias nuevas</h2>
            <form method='POST' className='flex flex-row gap-3 items-center'>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Elemento</label>
                    <select name="" id="" className='w-full rounded-lg border border-stroke bg-transparent py-4 px-2 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'>
                        <option value="">Seleccionar elemento...</option>
                    </select>
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Cantidad</label>
                    <input type="number" className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' placeholder='Cantidad'/>
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="">Descripción</label>
                    <textarea name="" id="" cols="30" rows="2" className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' placeholder='Descripción'></textarea>
                </div>
                <button type='submit' className='bg-primary p-2 text-white hover:scale-105 transition-all h-min rounded-lg'>Agregar existencias</button>
            </form>
        </div>      
    )
}

export default AddStock