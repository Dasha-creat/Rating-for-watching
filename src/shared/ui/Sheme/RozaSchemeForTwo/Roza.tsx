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
  [studentId: string]: { 
    [subjectId: string]: number;
  };
}

interface IRozaProps {
  gradesForTwo: IGradesData | undefined;
  elements: IElement[];
  isLoading: boolean;
}

export const Roza: React.FC<IRozaProps> = ({ gradesForTwo, elements, isLoading }) => {
  const [radarData, setRadarData] = useState<any>(null);

  useEffect(() => {
    if (gradesForTwo && elements.length > 0) {
      const labels: string[] = elements.map(element => element.name);

      const datasets = Object.keys(gradesForTwo).map((studentId, index) => {
        const studentGrades = gradesForTwo[studentId];
        const data: number[] = elements.map(element => {
          return studentGrades[element.id] || 0;
        });

        return {
          label: `${studentId}`,
          data: data,
          backgroundColor: index === 0 ? 'rgba(34, 202, 236, 0.2)' : 'rgba(255, 99, 132, 0.2)',
          borderColor: index === 0 ? 'rgba(34, 202, 236, 1)' : 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: index === 0 ? 'rgba(34, 202, 236, 1)' : 'rgba(255, 99, 132, 1)',
        };
      });

      const newRadarData = {
        labels: labels,
        datasets: datasets,
      };

      setRadarData(newRadarData);
    }
  }, [gradesForTwo, elements]);

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true, 
        min: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Сравнение рейтинга студентов',
      },
    },
  };

  return (
    <div className='roza'>
      {isLoading ? (
        <div className="loading-container">
          <LoadingIndicator text="Загрузка схемы..." />
        </div>
      ) : radarData ? (
        <div className="radar-container">
          <Radar data={radarData} options={radarOptions} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
