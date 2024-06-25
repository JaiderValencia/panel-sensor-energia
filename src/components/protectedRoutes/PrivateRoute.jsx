import { useAuth } from '../../context/Auth/createProvider'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const { isLogin, loading } = useAuth()

    if (loading) return <h1>Cargando...</h1>

    if (!loading && !isLogin) return <Navigate to='/login' replace />

    return (
        <Outlet />
    )
}

export default PrivateRoute
