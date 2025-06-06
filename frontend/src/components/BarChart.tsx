import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  tipoMetrica: string;
  promedio: number;
  chartId?: string;
}

const BarChart: React.FC<BarChartProps> = ({ tipoMetrica, promedio, chartId }) => {
  if (!tipoMetrica || promedio === 0) {
    return (
      <div style={{ height: '300px', width: '100%' }} className="d-flex align-items-center justify-content-center">
        <p className="text-muted">Seleccione una métrica</p>
      </div>
    );
  }

  const data = {
    labels: [tipoMetrica],
    datasets: [
      {
        label: 'Promedio',
        data: [promedio],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: tipoMetrica,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar 
        data={data} 
        options={options}
        key={chartId}
      />
    </div>
  );
};

export default BarChart;