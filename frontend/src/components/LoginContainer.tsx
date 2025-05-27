import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "../assets/styles.css"
import { useApp } from "../utilities/Context"
import { useEffect } from "react"



type Register = {
    usuario: string,
    contraseña: string,
}

const LoginContainer = () => {

    const { register, handleSubmit } = useForm<Register>()
    const navigate = useNavigate()
    const { setPagina } = useApp()

    const enviar = async (data: Register) => {
        console.log(data)
        //To do: logica inicio de sesion


        navigate("/pacientes")
    }

    useEffect(() => {
        setPagina("Login")
    })
    return (
        <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle" style={{ minHeight: '85vh' }}>
            <div>
                <form onSubmit={handleSubmit(enviar)} className="p-4 rounded border border-dark" style={{ backgroundColor: '#f3eded', width: '300px' }}>
                    <div className="mb-5">
                        <label>Usuario</label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Usuario" {...register("usuario")} />
                    </div>
                    <div className="mb-5">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Contraseña" {...register("contraseña")} />
                    </div>
                    <button type="submit" className="btn btn-secondary w-100 mt-5">Continuar</button>
                </form>
            </div>
        </div>

    )
}

export default LoginContainer