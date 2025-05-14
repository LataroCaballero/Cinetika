import axios from "axios";
import type { HitoType, PacienteType } from "./Types";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export function test() {
    return api.get('/test')
}

export const pacientesService = {
    getAll: () => api.get<PacienteType[]>('/pacientes'),
    get:(id: number) => api.get<PacienteType>(`/pacientes/${id}/historial-completo`)
    .then(function (response) {
        console.log(response);
        
        response.data.edad = new Date().getFullYear() - new Date(response.data.fecha_nac).getFullYear()
        return response
    }),
}

export const hitoService = {
    get:(id: number) => api.get<HitoType>(`hitos/${id}`),
}
