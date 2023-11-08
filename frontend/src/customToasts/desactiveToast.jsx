import toast from "react-hot-toast";
import axiosClient from '../axios-client.js';

export const desactiveToast = (id, status) => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 flex-col gap-3`}
        >
            <h1>¿Estas seguro que quires {status == true ? 'desactivar' : 'activar'} este elemento?</h1>
            <div className="flex flex-row gap-3">
                <button className={`p-1 ${status == true ? `bg-red-700` : 'bg-green-700'}  text-white rounded hover:scale-105 transition-all`} onClick={() => {
                    if (desactiveElement(id)) {
                        desactive(t.id, status)
                      } else {
                        toast.error("Error al desactivar el elemento");
                      }
                } }>{status == true ? 'Desactivar' : 'Activar'}</button>
                <button onClick={() => toast.dismiss(t.id)} className={`p-1 ${status == true ? `bg-primary` : 'bg-red-700'} text-white rounded hover:scale-105 transition-all`}>Cancelar</button>
            </div>
        </div>
    ))
}

const desactive = (id_toast, status) => {
    toast.remove(id_toast);
    toast.success(`Elemento ${ status == true ? 'desactivado' : 'activado'} con exito`, { duration: 100, autoClose: true});
}

const desactiveElement = (id) => {
    try {
        axiosClient.delete(`/v1/elements/${id}`).then((response) => {
            setTimeout(() => {
                location.reload()
            }, 1000)
        })
        return true;
    } catch (error) {
        console.log(error);
    }
}