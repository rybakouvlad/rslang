import React from 'react';
import { Pie } from 'react-chartjs-2';

interface BarChartProps {
  data: Array<number>;
}

export const PieChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const { data } = props;
  const dataForChart = {
    labels: ['Rigth answers %', 'Wrong answers %'],
    datasets: [
      {
        label: 'Pie of right and wrong answers',
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        hoverBackgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        hoverOffset: 25,
        data: data,
      },
    ],
  };

  return (
    <div>
      <Pie
        data={dataForChart}
        width={300}
        height={300}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Pie of right and wrong answers',
            fontSize: 16,
          },
        }}
      />
    </div>
  );
};
