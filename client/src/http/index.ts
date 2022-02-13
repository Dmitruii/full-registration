import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = `http://localhost:5004/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(config => {
    return config
},async error => {
    const originalRequest = error.confog
    if(error.response.status == 401 && error.confog && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.refreshToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log(`isn't authorized`)
        }
    }
    throw error
})

export default $api