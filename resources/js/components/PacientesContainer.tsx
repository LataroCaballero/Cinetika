import { useNavigate } from "react-router-dom"
import PacientesTable from "./PacientesTable"
import mock_data from "../assets/MOCK_DATA.json"
import { useEffect, useState } from "react"
import { useApp } from "../utilities/Context";
import { useForm } from "react-hook-form"
import { PacienteType } from "@/utilities/Types";

type Register = {
  dni:string
}

const PacientesContainer = () => {
  const {register, handleSubmit} = useForm<Register>()
  const navigator = useNavigate()
  const {setPagina} = useApp()
  const [listadoPacientes, setListadoPacientes] = useState<PacienteType[]>([])

  useEffect(()=>{
    setPagina("Pacientes")
    //todo: get pacientes
    setListadoPacientes(mock_data)
  },[])

  function filtrar(data:Register){
      let listadoPacientesFiltrados:PacienteType[]
      data.dni ? listadoPacientesFiltrados = mock_data.filter((elemento) => elemento.dni == parseInt(data.dni)) : listadoPacientesFiltrados = mock_data
      setListadoPacientes(listadoPacientesFiltrados)
  }

  return (
    <div className="container-fluid mt-4 ">
        <div className="row justify-content-center">
          <div className="col-md-3 d-flex flex-column gap-3  ">
              <form onSubmit={handleSubmit(filtrar)}>
                <div>
                  <label>DNI</label>
                  <input type="text" className="form-control" autoComplete="off" placeholder="DNI" {...register("dni")}/>
                </div>
                <button type="submit" className="btn btn-secondary w-100 mt-3">Buscar</button>
              </form>

              <button className="btn btn-secondary mt-3 w-100" onClick={() => navigator('/paciente/nuevo')}>Cargar Paciente</button>
          </div>
          <div className="col-md-7">
            <PacientesTable pacientes={listadoPacientes}/>
          </div>
        </div>
    </div>
  )
}

export default PacientesContainer