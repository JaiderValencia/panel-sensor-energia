import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth"
import Swal from "sweetalert2"
import FormInput from "../components/FormInput/Component"
import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [registerErrors, setRegisterErrors] = useState({})
    const navigate = useNavigate()
    const fields = [
        {
            type: 'text',
            placeholder: 'Ingresa tu nombre completo',
            label: 'Nombre completo',
            hasError: registerErrors.full_name,
            requiredError: 'El nombre es requerido',
            requirements: register('full_name', { required: true })
        },
        {
            type: "email",
            placeholder: "Ingrese su correo",
            label: "Correo",
            hasError: registerErrors.email,
            requiredError: "El correo es requerido",
            requirements: register('email', { required: true })
        },
        {
            type: "text",
            placeholder: "Ingrese su número de teléfono",
            label: "Teléfono",
            hasError: registerErrors.phone,
            requiredError: "El teléfono es requerido",
            requirements: register('phone', { required: true }),
        },
        {
            type: "password",
            placeholder: "*******",
            label: "Contraseña",
            hasError: registerErrors.password,
            requiredError: "La contraseña es requerida",
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

            await registerRequest(formData)

            Swal.close()

            navigate('/login')
        } catch ({ response }) {
            if (response.status == 422) {
                for (const [key, value] of Object.entries(response.data.errors)) {
                    setRegisterErrors((prevState) => ({
                        ...prevState
                        , [key]: {
                            message: value[0]
                        }
                    }))
                }
            }

            if (response.status == 500 || !response) {
                Swal.fire({
                    title: "Algo ha pasado, intenta nuevamente o en otro momento",
                    icon: "error"
                })
            }
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length) {
            setRegisterErrors(errors)
        }
    }, [errors])

    useEffect(() => {
        if (Object.keys(registerErrors).length) {
            Swal.fire({
                title: "Tienes errores por solucionar",
                icon: "error"
            })
        }
    }, [registerErrors])

    return (
        <div className="dark:bg-[#1a1b1e] bg-white min-h-screen flex items-center justify-center">
            <div className="bg-[#2b2c30] dark:bg-[#1a1b1e] rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Registro</h2>
                <form className="space-y-4" onSubmit={handleSubmit(registerFn)}>

                    {fields.map((field, i) => (
                        <FormInput
                            type={field.type}
                            placeholder={field.placeholder}
                            label={field.label}
                            hasError={field.hasError}
                            requiredError={field.requiredError}
                            requirements={field.requirements}
                            key={i}
                        />
                    ))}

                    <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6366f1]" type="submit">Registrarse</button>
                </form>
                <div className="mt-4 text-white text-center">
                    ¿Ya tienes cuenta? <Link className="text-[#6366f1]" to="/login">Iniciar sesion</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage