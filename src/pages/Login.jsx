import { useAuth } from '../context/Auth/createProvider'
import { useForm } from "react-hook-form"
import { loginRequest } from "../api/auth"
import Swal from "sweetalert2"
import FormInput from "../components/FormInput/Component"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
    email: yup.string().email('Debes poner un correo válido').required('El correo es requerido'),
    password: yup.string().required('La contraseña es requerida')
})

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })
    const { setIsLogin, setUserData } = useAuth()
    const navigate = useNavigate()
    const [errorsState, setErrorsState] = useState(null)
    const fields = [
        {
            type: "email",
            placeholder: "Ingrese su correo",
            label: "Correo",
            hasError: errorsState?.email,
            requirements: register('email', { required: true })
        },
        {
            type: "password",
            placeholder: "*******",
            label: "Contraseña",
            hasError: errorsState?.password,
            requirements: register('password', { required: true }),
        }
    ]

    const registerFn = async (formData) => {
        try {
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera mientras se valida la información',
                showConfirmButton: false,
                allowOutsideClick: false,
                icon: 'success'
            })

            const { data } = await loginRequest(formData)

            Swal.close()

            setIsLogin(true)

            setUserData({
                email: data.sessionData.email,
                full_name: data.sessionData.full_name
            })

            navigate('/')
        } catch ({ response }) {
            if (response.status == 404) {
                Swal.fire({
                    title: "Error",
                    text: response.data.meta.message,
                    icon: "error"
                })
            }

            if (response.status == 500 || !response.status) {
                Swal.fire({
                    title: "Algo ha pasado, intenta nuevamente o en otro momento",
                    icon: "error"
                })
            }
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length) {
            setErrorsState(errors)
        }
    }, [errors])

    return (
        <div className="dark:bg-[#1a1b1e] bg-white min-h-screen flex items-center justify-center">
            <div className="bg-[#2b2c30] dark:bg-[#1a1b1e] rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Iniciar sesion</h2>
                <form className="space-y-4" onSubmit={handleSubmit(registerFn)}>

                    {fields.map((field, i) => (
                        <FormInput
                            type={field.type}
                            placeholder={field.placeholder}
                            label={field.label}
                            hasError={field.hasError}
                            requirements={field.requirements}
                            key={i}
                        />
                    ))}

                    <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6366f1]" type="submit">Iniciar sesion</button>
                </form>
                <div className="mt-4 text-white text-center">
                    ¿Eres nuevo? <Link className="text-[#6366f1]" to="/register">Crea una cuenta</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage