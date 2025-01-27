import axios from "./axios"

export const registerRequest = (formData) => axios.post('/user/register', formData)
export const loginRequest = (formData) => axios.post('/user/login', formData)
export const logoutRequest = () => axios.post('/user/logout')
export const validateRequest = () => axios.post('user/validate')