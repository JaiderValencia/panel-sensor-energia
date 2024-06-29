import { useAuth } from '../../context/Auth/createProvider'
import { Navigate, Outlet } from 'react-router-dom'
import SpinLoader from '../spinLoader/Component'

function PrivateRoute() {
    const { isLogin, loading } = useAuth()

    if (loading) return <SpinLoader fullscreen={true}></SpinLoader>

    if (!loading && !isLogin) return <Navigate to='/login' replace />

    return (
        <Outlet />
    )
}

export default PrivateRoute
