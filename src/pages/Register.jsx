import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [registerErrors, setRegisterErrors] = useState({})
    const navigate = useNavigate()

    const registerFn = async (formData) => {
        try {
            await registerRequest(formData)

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

            if (response.status == 500) {
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
        <div>
            <form onSubmit={handleSubmit(registerFn)}>
                <input type="text" placeholder="Nombre completo" {
                    ...register('full_name',
                        { required: true })} />
                {registerErrors.full_name && (
                    <p>
                        {
                            registerErrors.full_name.type === 'required' ?
                                (
                                    'El nombre es requerido'
                                ) :
                                (
                                    registerErrors.full_name.message
                                )
                        }
                    </p>
                )}

                <input type="email" placeholder="Correo electrónico" {
                    ...register('email', {
                        required: true,
                    })} />
                {registerErrors.email && (
                    <p>
                        {
                            registerErrors.email.type === 'required' ?
                                (
                                    'la contraseña es requerida'
                                ) :
                                (
                                    registerErrors.email.message
                                )
                        }
                    </p>
                )}

                <input type="text" placeholder="Número de celular"
                    {...register('phone', {
                        required: true,
                    })} />
                {registerErrors.phone && (
                    <p>
                        {
                            registerErrors.phone.type === 'required' ?
                                (
                                    'El número de celular es requerido'
                                ) :
                                (
                                    registerErrors.phone.message
                                )
                        }
                    </p>
                )}


                <input type="password" autoComplete="false" {...register('password', {
                    required: true,
                    min: 6
                })} />
                {registerErrors.password && (
                    <p>
                        {
                            registerErrors.password.type === 'required' ?
                                (
                                    'La contraseña es requerida'
                                ) :
                                (
                                    registerErrors.password.message
                                )
                        }
                    </p>
                )}

                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterPage