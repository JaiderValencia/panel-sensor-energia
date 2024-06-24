import axios from "./axios"

export const registerRequest = (formData) => axios.post('/user/register', formData)
export const loginRequest = (formData) => axios.post('/user/login', formData)