import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale,PointElement,LinearScale,LineElement,Title,Tooltip,Legend } from 'chart.js';


Chart.register(
  CategoryScale,PointElement,LinearScale,LineElement,Title,Tooltip,Legend
)


type Props = {
  name:string,
  values:number[]
}

const LineChart = (props: Props[]) => {
  console.log(props)
  const data = {

  }
  
  const options ={
    type:"line",
    data: data
  }

  return (
    
    <div>hola</div>
  )
}

export default LineChart