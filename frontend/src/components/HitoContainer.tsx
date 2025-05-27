import { Navigate, useParams } from "react-router-dom";
import { useApp } from "../utilities/Context"
import type { HitoType } from "../utilities/Types";
import { useEffect, useState } from "react";
import { hitoService } from "../utilities/api";



const HitoContainer = () => {
    const [hito, setHito] = useState<HitoType | undefined>(undefined)
    const { id } = useParams();
    const { setPagina } = useApp()

    if (isNaN(Number(id))) {
        return <Navigate to="/404" />;
    }

    const fetchHito = async () => {
        const respuesta = await hitoService.get(Number(id))
        return respuesta.data
    }

    useEffect(() => {
        setPagina('Hito')

        const getHito = async () => {
            try {
                const data = await fetchHito()
                console.log(data)
                
                setHito(data)
            } catch (error) {
                console.log(error)
            }
        }

        getHito()
    }, [])

    return (
        <div>HitoContainer</div>
    )
}

export default HitoContainer