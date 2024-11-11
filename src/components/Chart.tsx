/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChart {
  title: string;
}

export default function PieChart({ title }: IPieChart) {
  const data = {
    labels: ['Produtos', 'Serviços', 'Outros'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: R$ ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 p-8 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4 text-primary text-center">{title}</h2>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}
