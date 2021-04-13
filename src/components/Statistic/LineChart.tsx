import React from 'react';
import { Line } from 'react-chartjs-2';

interface BarChartProps {
  labels: Array<string>;
  data: Array<number>;
}

export const LineChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const { data, labels } = props;
  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: 'Second chart',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data,
      },
    ],
  };

  const scales = {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  };

  return (
    <div>
      <Line
        data={dataForChart}
        width={400}
        height={500}
        options={{
          maintainAspectRatio: false,
          scales,
        }}
      />
    </div>
  );
};
