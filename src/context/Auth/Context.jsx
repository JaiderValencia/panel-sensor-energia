import { useState } from 'react'
import { create } from './createProvider'
import propTypes from 'prop-types'

export function Context({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState({
        full_name: '',
        email: ''
    })

    return (
        <create.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData
        }}>
            {children}
        </create.Provider>
    )
}

Context.propTypes = {
    children: propTypes.node.isRequired
}