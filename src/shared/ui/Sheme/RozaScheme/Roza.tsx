import React, { useEffect, useState } from 'react';
import { LoadingIndicator } from '../../index';
import './Roza.css';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface IElement {
  id: string;
  name: string;
}

interface IGradesData {
  [subjectId: string]: number;
}

interface IRozaProps {
  gradesData: IGradesData;
  elements: IElement[];
  isLoading: boolean;
}

export const Roza: React.FC<IRozaProps> = ({ gradesData, elements, isLoading }) => {
  const [radarData, setRadarData] = useState<any>(null);

  useEffect(() => {
    if (gradesData && Array.isArray(elements)) { 
      const labels: string[] = [];
      const data: number[] = [];

      elements.forEach((element) => {
        const totalGrade = gradesData[element.id];
        if (totalGrade !== undefined) {
          labels.push(element.name);
          data.push(totalGrade);
        }
      });

      setRadarData({
        labels: labels,
        datasets: [
          {
            label: 'Рейтинг студента',
            data: data,
            backgroundColor: 'rgba(34, 202, 236, 0.2)',
            borderColor: 'rgba(34, 202, 236, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(34, 202, 236, 1)',
          },
        ],
      });
    }
  }, [gradesData, elements]);

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Радарная диаграмма рейтинга студента',
      },
    },
  };

  return (
    <div className='roza'>
      {isLoading ? (
        <LoadingIndicator text="Загрузка схемы..." />
      ) : radarData ? (
        <Radar data={radarData} options={radarOptions} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};