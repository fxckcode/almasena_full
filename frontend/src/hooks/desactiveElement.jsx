import { lazy } from "react";

const toast = lazy(() => import ('react-hot-toast'))
const axiosClient = lazy(() => import('../axios-client.js'))
const desactiveElement = (id, status) => {
    try {
        console.log(id, status);
    } catch (error) {
        toast.error("Error al desactivar elemento")
    }
}

export default desactiveElement;