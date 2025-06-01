import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';




Chart.register(
  CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend
)


type Props = {
  MetricasData: {
    name: string;
    values: number[];
    promedio: number;
  }[]
}

const LineChartHitos = (props: Props) => {
  const { MetricasData } = props

  console.log(props)



  const options = {
    type: "line",
    label: "metricas",
    labels: Array.from({ length: MetricasData[0]?.values.length || 0 }, (_, index) => `repetición ${index + 1}`),
    datasets: MetricasData.map((metrica, indice) => ({
      label: metrica.name,
      data: metrica.values,
      fill: false,
      borderColor: `hsl(${indice * 60}, 70%, 50%)`,
      tension: 0.1
    }))


  }

  return (

    <Line data={options} />
  )
}

export default LineChartHitos