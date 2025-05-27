import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useApp } from "../utilities/Context"
import { useEffect } from "react"

type Register = {
  nombre: string,
  apellido: string,
  dia_nac: string,
  mes_nac: string,
  año_nac: string,
  dni: string,
  celular?: string,
  mail?: string,
  grupo?: string
}

const NuevoPacienteForm = () => {
  const { register, handleSubmit } = useForm<Register>()
  const navigate = useNavigate()
  const { setPagina } = useApp()
  const añoActual = new Date().getFullYear();

  const dias = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const años = Array.from({ length: añoActual - 1919 }, (_, i) => (añoActual - i).toString());

  useEffect(() => {
    setPagina('Cargar Paciente')
  }, [])

  const enviar = async (data: Register) => {
    console.log(data)
    //To do: post
    navigate("/pacientes")
  }



  return (
    <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle bg-light">

      <form onSubmit={handleSubmit(enviar)} className="p-4 rounded border border-dark" style={{ backgroundColor: '#f3eded', width: '300px' }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" autoComplete="off" placeholder="Juan" {...register("nombre")} />
          <label>Apellido</label>
          <input type="text" className="form-control w-100" autoComplete="off" placeholder="Perez" {...register("apellido")} />
          <label>Dni</label>
          <input type="text" className="form-control w-100" autoComplete="off" placeholder="123456789" {...register("dni")} />
        </div>
        <div className="row">
          <label className="form-label">Fecha nacimiento</label>
          <div className="col">
            <label className="form-label">Dia</label>
            <select className="form-control">
              {dias.map((i) =>
                <option key={i} value={i}>{i}</option>)
              }
            </select>
          </div>
          <div className="col">
            <label className="form-label">Mes</label>
            <select className="form-control">
              {meses.map((mes, i) =>
                <option key={i} value={i}>{mes}</option>)
              }
            </select>
          </div>
          <div className="col">
            <label className="form-label">Año</label>
            <select className="form-control">
              {años.map((i) =>
                <option key={i} value={i}>{i}</option>)
              }
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control w-100" autoComplete="off" placeholder="ejemplo@ejemplo.com" {...register("mail")} />
        </div>
        <div className="mb-3">
          <label>Telefono</label>
          <input type="string" className="form-control w-100" autoComplete="off" placeholder="Juan" {...register("celular")} />
        </div>
        <div className="mb-3">
          <label>Grupo</label>
          <input type="text" className="form-control w-100" autoComplete="off" placeholder="Juan" {...register("grupo")} />
        </div>
        <button type="submit" className="btn btn-secondary w-100 mt-5">Continuar</button>
      </form>
    </div>


  )
}

export default NuevoPacienteForm