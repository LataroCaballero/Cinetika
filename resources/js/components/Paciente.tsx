import { useParams } from 'react-router-dom'

//todo no usar mock_data
import mock_data from '../assets/MOCK_DATA.json'
import { PacienteType } from '../utilities/Types';

const Paciente = () => {
  const { id } = useParams();
  const pacienteId = id ? parseInt(id) : undefined;

  const paciente:PacienteType | undefined = mock_data.find((element) => element.id === pacienteId)
  
  if (!paciente) {
    return (
      <div>
        <p>No se encontró el paciente con ID: {pacienteId}</p>
      </div>
    );
  }

  const {nombre,apellido,edad,dni} = paciente
  return (
    <div>
      <p>{nombre}</p>
      <p>{apellido}</p>
      <p>{edad}</p>
      <p>{dni}</p>
    </div>
    
  )
}

export default Paciente