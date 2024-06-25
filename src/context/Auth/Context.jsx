import { useEffect, useState } from 'react'
import { create } from './createProvider'
import propTypes from 'prop-types'
import { validateRequest } from '../../api/auth'
import Cookies from 'js-cookie'

export function Context({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState({
        full_name: '',
        email: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!Cookies.get('Token')) {
            setLoading(false)
            return setIsLogin(false)
        }

        (async () => {
            try {
                const response = await validateRequest(Cookies.get('Token'))

                if (!response.data) return setIsLogin(false)

                setIsLogin(true)
                setUserData(response.data.sessionData)
            } catch (error) {
                setIsLogin(false)
            }

            setLoading(false)
        })();
    }, [])

    return (
        <create.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData,
            loading,
            setLoading
        }}>
            {children}
        </create.Provider>
    )
}

Context.propTypes = {
    children: propTypes.node.isRequired
}