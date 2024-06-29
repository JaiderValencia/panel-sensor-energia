import { useAuth } from '../../context/Auth/createProvider'
import { Navigate, Outlet } from 'react-router-dom'
import SpinLoader from '../spinLoader/Component'

function PublicRoute() {
    const { isLogin, loading } = useAuth()

    if (loading) return <SpinLoader fullscreen={true}></SpinLoader>

    if (!loading && isLogin) return <Navigate replace to='/' />

    return (
        <Outlet />
    )
}

export default PublicRoute
