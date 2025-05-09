import { useNavigate } from "react-router-dom"
import PacientesTable from "./PacientesTable"
import { useEffect, useState } from "react"
import { useApp } from "../utilities/Context";
import type { PacienteType } from "../utilities/Types";
import { pacientesService } from "../utilities/api";


const PacientesContainer = () => {
  const [query, setQuery] = useState<string>('')
  const navigator = useNavigate()
  const {setPagina} = useApp()
  const [pacientesData, setPacientesData] = useState<PacienteType[]>([])
  const [listadoPacientes, setListadoPacientes] = useState<PacienteType[]>([])

  const fetchPacientes = async ():Promise<PacienteType[]>=>{
    const respuesta = await pacientesService.getAll()
    return respuesta.data
  }

  useEffect(()=>{
    setPagina("Pacientes")
    

    const obtenerPacientes = async () => {
      try {
        const respuesta = await fetchPacientes();
        setPacientesData(respuesta)
        setListadoPacientes(respuesta)
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
        setListadoPacientes([]);
      }
    }

    obtenerPacientes();
  },[])

  useEffect(()=>{
    if (!pacientesData) return
   
    let listadoPacientesFiltrados:PacienteType[]
    query=='' ? listadoPacientesFiltrados = pacientesData : listadoPacientesFiltrados = pacientesData.filter((elemento) => elemento.dni.startsWith(query)) 
    setListadoPacientes(listadoPacientesFiltrados)
  },[query])


  return (
    <div className="container-fluid mt-4 ">
        <div className="row justify-content-center">
          <div className="col-md-3 d-flex flex-column gap-3  ">
              <label>DNI</label>
              <input type="text" className="form-control" autoComplete="off" placeholder="DNI" onChange={(e) => setQuery(e.target.value)}/>
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