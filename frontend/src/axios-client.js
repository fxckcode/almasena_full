import axios from "axios";

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
})

export default axiosClient