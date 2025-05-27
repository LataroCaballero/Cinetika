import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import formatDate from '../utilities/CommonFunctions';



Chart.register(
  CategoryScale, PointElement, LinearScale, LineElement, Title, Tooltip, Legend
)


type Props = {
  tipoMetrica: string,
  tipoMedicion: string,
  mediciones: { fecha: string, valores: Record<string, number> }[]
}

const LineChart = (props: Props) => {
  const { tipoMetrica, tipoMedicion, mediciones } = props

  console.log(props)



  const options = {
    type: "line",
    label:tipoMedicion,
    labels: mediciones.map((m) => {return formatDate(m.fecha)}),
    datasets: [{
      label: tipoMetrica,
      data: mediciones.map((m) => m.valores[tipoMetrica]),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]


  }

  return (

    <Line data={options} />
  )
}

export default LineChart