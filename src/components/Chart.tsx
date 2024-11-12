/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

interface IPieChart {
  title: string;
  labels: string[],
  data: number[],
  colors: string[],
  type: "Pie" | "Line"
}

export default function PieChart({ title, labels, data, colors, type }: IPieChart) {
  const dataObj = {
    labels: labels,
    datasets: [
      {
        label: 'Faturamento',
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 p-8 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4 text-primary text-center">{title}</h2>
      <div
         style={{
          width: type === 'Line' ? '500px' : '300px',
          height: type === 'Line' ? '300px' : '300px',
        }}
      >
      {type === 'Pie' ? (
          <Pie data={dataObj} options={options} />
        ) : (
          <Line data={dataObj} options={options} />
        )}
      </div>
    </div>
  )
}
