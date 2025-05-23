import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { HitoType, PacienteType } from '../utilities/Types';
import { useApp } from '../utilities/Context';
import { useEffect, useState } from 'react';
import { pacientesService } from '../utilities/api';
import '../assets/styles.css'
import { OverlayTrigger, Popover } from 'react-bootstrap';






const Paciente = () => {
  const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined)
  const [hitos, setHitos] = useState<HitoType[] | undefined>(undefined)
  const { id } = useParams();
  const { setPagina } = useApp()
  const navigate = useNavigate()
 


  if (isNaN(Number(id))) {
    return <Navigate to="/404" />;
  }

  const fetchPaciente = async () => {
    const respuesta = await pacientesService.get(Number(id))
    return respuesta.data
  }

  const renderPopover = (titulo: string, contenido: string) => (
    <Popover id="popover-id">
      <Popover.Header as="h3">{titulo}</Popover.Header>
      <Popover.Body>{contenido}</Popover.Body>
    </Popover>
  );




  useEffect(() => {
    setPagina('Paciente')

    const getPaciente = async () => {
      try {
        const data = await fetchPaciente()
        setPaciente(data)

        let tempHitos = data.hitos

       if (tempHitos) setHitos(tempHitos.sort((hito1,hito2)=> new Date(hito1.fecha).getTime() - new Date(hito2.fecha).getTime()))

      } catch (error) {
        console.log(error)
      }
    }

    getPaciente()
  }, [])


  if (!paciente) {
    return (
      <div>
        <p>cargando</p>
      </div>
    );
  }

  const { nombre_apellido, grupo, dni, edad, telefono, email } = paciente

  return (
    <div>

      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className='row p-4 rounded border border-dark'>
          <div className='col'>
            <div className="d-flex justify-content-between mb-2">
              <p className="mb-0 fw-bold">Nombre: {nombre_apellido}</p>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="mb-0">Grupo: {grupo}</p>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="mb-0">Dni: {dni}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-0">Edad: {edad}</p>
            </div>
          </div>
          <div className='col'>
            <p className="mb-0">Telefono: {telefono}</p>
            <p className="mb-0">Email: {email}</p>
          </div>
        </div>
      </div>


      <div className="container mt-5">
        <div className="timeline">
          <div className="timeline-row">

            {hitos?.map((hito) => {
              return (
                <OverlayTrigger
                  trigger={"hover"}
                  placement='top'
                  overlay={renderPopover(hito.fecha, hito.descripcion)}
                >
                  <div className="timeline-event" data-toggle="popover" title={hito.fecha} data-content={hito.descripcion} onClick={() => navigate(`/hito/${hito.id_hito}`)}>
                    <div className="timeline-marker"></div>
                  </div>

                </OverlayTrigger>

              )

            })}

          </div>
        </div>
      </div>
    </div>

  )
}

export default Paciente