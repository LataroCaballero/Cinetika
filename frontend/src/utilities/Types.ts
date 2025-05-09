export type PacienteType = {
    id_paciente:number,
    nombre_apellido:string,
    dni:string,
    fecha_nac:string,
    edad?:number,
    email?:string|null,
    telefono?:string|null,
    grupo?:string|null,
    hitos?: HitoType[],
    created_at?: string,
    updated_at?: string,
}

export type HitoType = {
    id_hito:number,
    id_paciente:number,
    titulo:string,
    descripcion:string,
    patologia:string,
    fecha:string,
    mediciones:MedicionType[],
    created_at?: string,
    updated_at?: string,
}

export type MedicionType = {
    id_medicion:number,
    id_hito:number,
    fecha:string,
    tipo_medicion:string,
    metricas:Record<string, number>,
    repeticiones: Repeticiones[],
    created_at?: string,
    updated_at?: string,
}

export type Repeticiones = {
    id_repeticion:number,
    id_medicion:number,
    valores:Record<string, number>,
    created_at?: string,
    updated_at?: string,
}

export type AppContextType = {
    nombrepagina: string,
    setPagina: (nombre:string) => void,
}
