import React from 'react';
import { Pie } from 'react-chartjs-2';

interface BarChartProps {
  data: Array<number>;
}

export const PieChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const { data } = props;
  const dataForChart = {
    labels: ['Правильные ответы %', 'Неправильные ответы %'],
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
        width={350}
        height={350}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Правильные и не правильные ответы',
            fontSize: 16,
          },
        }}
      />
    </div>
  );
};
