import Cookies from "js-cookie"
import { useAuth } from '../../context/Auth/createProvider'
import { Link } from "react-router-dom"
function Navbar() {
    const { setIsLogin, setUserData, userData } = useAuth()

    const deleteCookieHandle = () => {
        Cookies.remove('Token')
        setIsLogin(false)
        setUserData({})
    }

    return (
        <nav className="bg-[#333] h-16 fixed top-0 w-full flex justify-between items-center z-[1]">
            <div href="https://teamroboticsdelpacifico.com" className="ml-4">
                <h4 className="text-white font-bold">Hola {userData.full_name}</h4>
            </div>
            <div className="mr-4">
                <Link to='/login' onClick={deleteCookieHandle} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cerrar sesión
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
