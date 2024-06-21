import axios from "axios"

const baseURL = 'http://127.0.0.1:8000/api'

export const registerRequest = (formData) => axios.post(`${baseURL}/user/register`, formData)