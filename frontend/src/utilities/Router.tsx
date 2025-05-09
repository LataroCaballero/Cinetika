import { createBrowserRouter } from 'react-router-dom';
import LoginContainer from '../components/LoginContainer';
import PacientesContainer from '../components/PacientesContainer';
import Layout from '../components/Layout';
import Paciente from '../components/Paciente';
import PacienteForm from '../components/PacienteForm';




const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<LoginContainer/>,
            },
            {
                path: '/pacientes',
                element: <PacientesContainer/>,
            },
            {
                path: 'paciente/nuevo',
                element:<PacienteForm/>,
            },
            {
                path: '/paciente/:id',
                element: <Paciente/>,
            }
            
        ],
    },
]);

export default router; 