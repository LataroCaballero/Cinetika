import { Navigate, useParams } from "react-router-dom";
import { useApp } from "../utilities/Context"
import type { HitoType } from "../utilities/Types";
import { useEffect, useState, useMemo } from "react";
import { hitoService } from "../utilities/api";

import BarChart from "./BarChart";

import LineChartHitos from "./LineChartHitos";


/* info que encesito guardar para cada select de los query*/
type MetricaQuery = {
    id: string;
    metricaName: string;
    metricaIndex: number;
    promedio: number;
}


/* info de cada metrica*/

type MetricaData = {
    name: string;
    values: number[];
    promedio: number;
}

const NUM_QUERYS = 3

const HitoContainer = () => {
    const [hito, setHito] = useState<HitoType | undefined>(undefined)
    const { id } = useParams()
    const { setPagina } = useApp()
    const [metricasParaGrafica, setMetricasParaGrafica] = useState<MetricaData[]>([])





    const [QueriesElegidas, setQueriesElegidas] = useState<MetricaQuery[]>(
        Array.from({ length: NUM_QUERYS }, (_, index) => ({
            id: `query-${index}`,
            metricaName: "",
            metricaIndex: -1,
            promedio: 0
        }))
    );

    const mockdata = {
        fecha: "2025-05-28T21:20:18.000000Z",
        tipo: "tipo1",
        metricas: ["metrica1", "metrica2", "metrica3"],
        repeticiones: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
    };


    const MetricasProcesadas = useMemo<MetricaData[]>(() => {
        return mockdata.metricas.map((name, index) => {
            const values = mockdata.repeticiones.map(rep => rep[index])
            const promedio = values.reduce((sum, val) => sum + val, 0) / values.length

            return {
                name,
                values,
                promedio
            }
        })
    }, [mockdata])

    if (isNaN(Number(id))) {
        return <Navigate to="/404" />
    }

    const fetchHito = async () => {
        const respuesta = await hitoService.get(Number(id))
        return respuesta.data
    };

    const handleQueryMetrica = (metricaIndex: number, queryIndex: number) => {

        let tempMetricasData = metricasParaGrafica


        let metrica_a_cambiar = QueriesElegidas[queryIndex].metricaName;
        let indice = tempMetricasData.map(metrica => metrica.name).indexOf(metrica_a_cambiar);
        if (indice !== -1) tempMetricasData.splice(indice, 1);

        if (metricaIndex !== -1) tempMetricasData.push(MetricasProcesadas[metricaIndex]);


        setMetricasParaGrafica(tempMetricasData)

        setQueriesElegidas(prev =>
            prev.map((query, index) => {

                /* si no es el query que elegi */
                if (index !== queryIndex) return query;

                /* si elegi Ninguno en el query*/
                if (metricaIndex === -1) {
                    return {
                        ...query,
                        metricaName: "",
                        metricaIndex: -1,
                        promedio: 0
                    };
                }

                /* sino saco la metrica que elegi del query */
                const selectedMetric = MetricasProcesadas[metricaIndex]

                return {
                    ...query,
                    metricaName: selectedMetric.name,
                    metricaIndex,
                    promedio: selectedMetric.promedio
                };
            })
        );
        console.log(QueriesElegidas);

    };

    useEffect(() => {
        setPagina('Hito')

        const getHito = async () => {
            try {
                const data = await fetchHito()
                console.log(data)
                console.log(mockdata)
                setHito(data)
            } catch (error) {
                console.log(error)
            }
        }

        getHito()
    }, [])

    if (!hito) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-secondary" role="status" />
            </div>
        );
    }

    return (
        <div>
            <h1>{hito.titulo}</h1>
            <div className="container">
                <div className="row">
                    {QueriesElegidas.map((query, index) => (
                        <div key={query.id} className='col d-flex flex-column m-1'>
                            <div className='d-flex flex-column m-1'>
                                <label className='form-label'>Metrica {index + 1}</label>
                                <select
                                    value={query.metricaIndex}
                                    onChange={(e) => handleQueryMetrica(parseInt(e.target.value), index)}
                                >
                                    <option value={-1}>Ninguno</option>
                                    {MetricasProcesadas.map((metric, metricaIndex) => (
                                        <option key={metricaIndex} value={metricaIndex}>
                                            {metric.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <BarChart
                                key={`chart-${query.id}-${query.metricaIndex}`}
                                tipoMetrica={query.metricaName}
                                promedio={query.promedio}
                            />
                        </div>

                    ))}
                </div>
            </div>

            <div className='container d-flex justify-content-center align-items-center' style={{ width: '800px', maxWidth: '100%', height: '400px' }}>
                <LineChartHitos MetricasData={metricasParaGrafica} />
            </div>
        </div>
    );
};

export default HitoContainer;