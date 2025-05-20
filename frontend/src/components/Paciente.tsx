import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { HitoType, PacienteType } from '../utilities/Types';
import { useApp } from '../utilities/Context';
import { useEffect, useState } from 'react';
import { pacientesService } from '../utilities/api';
import '../assets/styles.css'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import LineChart from './LineChart';


type MedicionesParaGrafico = {
  [tipo_medicion: string]: {
    metricas: { fecha: string, valores: Record<string, number> }[],
  }
}


const Paciente = () => {
  const [paciente, setPaciente] = useState<PacienteType | undefined>(undefined)
  const [hitos, setHitos] = useState<HitoType[] | undefined>(undefined)
  const [dataGrafico, setDataParaGrafico] = useState<MedicionesParaGrafico>()
  const [queryTipoMedicion, setQueryTipoMedicion] = useState<string>("")
  const [queryTipoMetrica, setQueryTipoMetrica] = useState<string>("")


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

  const handleQueryMedicon = (value: string) => {
    setQueryTipoMedicion(value)
    if (!value) setQueryTipoMetrica(value);
  }


  useEffect(() => {
    setPagina('Paciente')

    const getPaciente = async () => {
      try {
        const data = await fetchPaciente()
        setPaciente(data)

        let tempHitos = data.hitos

        if (!tempHitos) return;

        setHitos(tempHitos.sort((hito1, hito2) => new Date(hito1.fecha).getTime() - new Date(hito2.fecha).getTime()))



        let medicionesGrafico: MedicionesParaGrafico = {}
        tempHitos.forEach(hito => {
          hito.mediciones?.forEach(medicion => {
            if (!medicionesGrafico[medicion.tipo_medicion]) {
              medicionesGrafico[medicion.tipo_medicion] = {
                metricas: [{ fecha: medicion.fecha, valores: medicion.metricas }]
              };
            }
            else {
              medicionesGrafico[medicion.tipo_medicion].metricas.push({ fecha: medicion.fecha, valores: medicion.metricas })
            }
          });
        });

        for (const hito in medicionesGrafico) {
          medicionesGrafico[hito].metricas.sort((metrica1, metrica2) => new Date(metrica1.fecha).getTime() - new Date(metrica2.fecha).getTime())
        }

        console.log(medicionesGrafico)
        setDataParaGrafico(medicionesGrafico)

      } catch (error) {
        console.log(error)
      }
    }

    getPaciente()
  }, [])


  if (!paciente) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border text-secondary" role="status" />
      </div>

    );
  }

  const { nombre_apellido, grupo, dni, edad, telefono, email } = paciente

  return (
    <div>
      {/*datos paciente*/}

      <div className='row'>
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
      </div>


      {/*linea temporal*/}
      <div className='row'>
        <div className="container mt-5">
          <div className="timeline">
            <div className="timeline-row">

              {hitos?.map((hito, index) => {
                return (
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement='top'
                    overlay={renderPopover(hito.fecha, hito.descripcion)}
                    key={index}
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


      {/*query grafica*/}
      <div className='row d-flex justify-content-center'>

        <div className='col-md-3 d-flex flex-column '>
          <label className='form-label'>Tipo de medicion</label>
          <select onChange={(e) => handleQueryMedicon(e.target.value)}>
            <option key={"ninguno"} value={''}>Ninguno</option>
            {dataGrafico && Object.entries(dataGrafico).map(([tipoMedicion]) =>
              <option key={tipoMedicion} value={tipoMedicion}>{tipoMedicion}</option>)}
          </select>
        </div>


        <div className='col-md-3 d-flex flex-column'>
          <label className='form-label'>Tipo de metrica</label>
          <select onChange={(e) => setQueryTipoMetrica(e.target.value)}>
            <option key={"ninguno"} value={''}>Ninguno</option>
            {queryTipoMedicion && dataGrafico && Object.entries(dataGrafico[queryTipoMedicion].metricas[0].valores).map(([tipoMetrica]) =>
              <option key={tipoMetrica} value={tipoMetrica}>{tipoMetrica}</option>)}
          </select>
        </div>
      </div>
      {/*grafica*/}
      <div className='container d-flex justify-content-center align-items-center' style={{ width: '800px', maxWidth: '100%', height: '400px' }}>
        {(queryTipoMedicion && queryTipoMetrica && dataGrafico) ?
          <LineChart tipoMedicion={queryTipoMedicion} tipoMetrica={queryTipoMetrica} mediciones={dataGrafico[queryTipoMedicion].metricas} />
          : <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <label>Ingresar tipo de medición y tipo de metrica</label>
            </div>
        }
      </div>

    </div>

  )
}

export default Paciente