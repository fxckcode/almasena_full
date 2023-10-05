import React from 'react'

function SignUp() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='shadow-lg rounded bg-gray-100 py-6 px-10  lg:w-[35%] md:w-[50%] w-[90%]'>
                <h1 className='text-green-800 font-bold text-2xl text-center mb-5'>AlmaSENA</h1>
                <h2 className='text-center font-bold'>Crear cuenta</h2>
                <form action="" className='flex flex-col'>
                <div className='flex flex-col gap-3 mb-4'>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' placeholder='Nombre' className='p-2 rounded outline-slate-400' required />
                    </div>
                    <div className='flex flex-col gap-3 mb-4'>
                        <label htmlFor="email">Correo</label>
                        <input type="email" name='email' placeholder='Correo Electrónico' className='p-2 rounded outline-slate-400' required />
                    </div>
                    <div className='flex flex-col gap-3 mb-16'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name='password' placeholder='Contraseña' className='p-2 rounded outline-slate-400' required />
                    </div>
                    <button className='w-full p-2 bg-green-900 text-white rounded hover:bg-green-700 transition-colors mb-4' type='submit'>Registrarse</button>
                    <p className='text-center mb-4'>o</p>
                    <a href="/" className='underline hover:text-green-900 transition-all text-md text-center'>Iniciar sesión</a>
                </form>
            </div>
        </div>
    )
}

export default SignUp