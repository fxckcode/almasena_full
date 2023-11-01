import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

axiosClient.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    request.headers.Authorization = `Bearer ${token}`
    return request
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status == 401) {
        localStorage.clear()
        location.href = "/logout"
    }
})

export default axiosClient