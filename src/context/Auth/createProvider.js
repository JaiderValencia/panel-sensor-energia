import { createContext, useContext } from 'react'

export const create = createContext()

export const useAuth = () => {
    return useContext(create)
}