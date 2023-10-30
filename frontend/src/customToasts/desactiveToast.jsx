import toast from "react-hot-toast";
import desactiveElement from "../hooks/desactiveElement";

export const desactiveToast = (id, estatus) => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 flex-col gap-3`}
        >
            <h1>¿Estas seguro que quires desactivar este elemento?</h1>
            <div className="flex flex-row gap-3">
                <button className="p-1 bg-red-700 text-white rounded hover:scale-105 transition-all" onClick={() => desactiveElement(111, true) }>Desactivar</button>
                <button onClick={() => toast.dismiss(t.id)} className="p-1 bg-primary text-white rounded hover:scale-105 transition-all">Cancelar</button>
            </div>
        </div>
    ))
}