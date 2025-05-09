import { Navigate, useParams } from 'react-router-dom'
import type { PacienteType } from '../utilities/Types';
import { useApp } from '../utilities/Context';
import { useEffect, useState } from 'react';
import { pacientesService } from '../utilities/api';

const Paciente = () => {
  const [paciente,setPaciente] = useState<PacienteType | undefined>(undefined)
  const { id } = useParams();
  const {setPagina} = useApp()

  if(isNaN(Number(id))){
    return <Navigate to="/404" />;
  }

  const fetchPaciente = async ()=>{
    const respuesta = await pacientesService.get(Number(id))
    return respuesta.data
  }


  useEffect(()=>{
    setPagina('Paciente') 
    
    const getPaciente= async () =>{
      try{
        const data = await fetchPaciente()
        setPaciente(data)
      }catch(error){
        console.log(error)
      }
    }

    getPaciente()
  },[])

  
  if (!paciente) {
    return (
      <div>
        <p>cargando</p>
      </div>
    );
  }

  const {nombre_apellido,grupo,dni,edad} = paciente
  return (
    <div>
      
        <div className="h-100 d-flex align-items-center justify-content-center basic-container">
            <div className="d-flex justify-content-between mb-2">
              <p className="mb-0 fw-bold">{nombre_apellido}</p>
              <p className="mb-0">{grupo}</p>
            </div>
            <div className="mb-2">
              <p className="mb-0">{dni}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-0">{edad}</p>
            </div>
        </div>
      
      
    </div>
    
  )
}

export default Paciente