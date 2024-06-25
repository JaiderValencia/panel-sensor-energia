import { useAuth } from '../../context/Auth/createProvider'
import { Navigate, Outlet } from 'react-router-dom'


function PublicRoute() {
    const { isLogin, loading } = useAuth()

    if (loading) return <h1>Cargando...</h1>

    if (!loading && isLogin) return <Navigate replace to='/' />

    return (
        <Outlet />
    )
}

export default PublicRoute
