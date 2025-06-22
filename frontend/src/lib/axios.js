import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URI,
    withCredentials:true,//this send cookies from browser
})