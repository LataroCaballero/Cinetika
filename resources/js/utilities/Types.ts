export type PacienteType = {
    id:number,
    nombre:string,
    apellido:string,
    edad:number,
    dni:number,
    grupo:string,
}

export type AppContextType = {
    nombrepagina: string,
    setPagina: (nombre:string) => void,
}
