import { useParams } from 'react-router-dom'

//todo no usar mock_data
import mock_data from '../assets/MOCK_DATA.json'
import { PacienteType } from '../utilities/Types';
import { useApp } from '@/utilities/Context';
import { useEffect } from 'react';

const Paciente = () => {
  const { id } = useParams();
  const {setPagina} = useApp()
  const pacienteId = id ? parseInt(id) : undefined;

  useEffect(()=>{
   setPagina('Paciente') 
  })

  const paciente:PacienteType | undefined = mock_data.find((element) => element.id === pacienteId)
  
  if (!paciente) {
    return (
      <div>
        <p>No se encontró el paciente con ID: {pacienteId}</p>
      </div>
    );
  }

  const {nombre,apellido,edad,dni,grupo} = paciente
  return (
    <div>
      
        <div className="h-100 d-flex align-items-center justify-content-center basic-container">
            <div className="d-flex justify-content-between mb-2">
              <p className="mb-0 fw-bold">{nombre} {apellido}</p>
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