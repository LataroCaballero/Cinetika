import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import type { PacienteType } from "../utilities/Types";

type PacientesProps = {
    pacientes : PacienteType[]
}

const PacientesTable = (pacientesprops:PacientesProps) => {

  const {pacientes} = pacientesprops

  
  const navigate = useNavigate();
  
  useEffect(()=>{
  },[pacientes])

  return (
    <div className="p-3">
        <table className="table table-hover table-bordered">
            <thead className="table-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Dni</th>
                <th scope="col">Grupo</th>
                </tr>
            </thead>
            
            <tbody>
              {pacientes.map(
                (paciente)=>{
                  return(
                        <tr key={paciente.id_paciente} onClick={() => navigate(`/paciente/${paciente.id_paciente}`)}>
                          <td>{paciente.id_paciente}</td>
                          <td>{paciente.nombre_apellido}</td>
                          <td>{paciente.dni}</td>
                          <td>{paciente.grupo}</td>
                        </tr>
                        )
                            }
                          ) 
              }
            </tbody>
        </table>
    </div>
  )
}

export default PacientesTable