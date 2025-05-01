import { useNavigate } from "react-router-dom"
import PacientesTable from "./PacientesTable"
import mock_data from "../assets/MOCK_DATA.json"
const PacientesContainer = () => {
  const navigator = useNavigate()

  return (
    <div className="container-fluid mt-4 ">
        <div className="row justify-content-center">
          <div className="col-md-3 d-flex flex-column align-items-start gap-3">
            <button className="btn btn-secondary mt-3 w-100" onClick={() => navigator('/paciente/nuevo')}>Cargar Paciente</button>
          </div>
          <div className="col-md-7">
            <PacientesTable pacientes={mock_data}/>
          </div>
        </div>
    </div>
  )
}

export default PacientesContainer