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
  gradesDataFirst: IGradesData;
  gradesDataSecond: IGradesData;
  elements: IElement[];
  isLoading: boolean;
  firstPeriodLabel: string;
  secondPeriodLabel: string;
}

export const Roza: React.FC<IRozaProps> = ({
  gradesDataFirst,
  gradesDataSecond,
  elements,
  isLoading,
  firstPeriodLabel,
  secondPeriodLabel,
}) => {
  const [radarData, setRadarData] = useState<any>(null);

  useEffect(() => {
    if (elements.length > 0) {
      const labels: string[] = elements.map(element => element.name);

      const extractData = (gradesData: IGradesData) => {
        return elements.map(element => gradesData[element.id] || 0);
      };

      const dataFirst = extractData(gradesDataFirst);
      const dataSecond = extractData(gradesDataSecond);

      const newRadarData = {
        labels: labels,
        datasets: [
          {
            label: firstPeriodLabel,
            data: dataFirst,
            backgroundColor: 'rgba(34, 202, 236, 0.2)',
            borderColor: 'rgba(34, 202, 236, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(34, 202, 236, 1)',
          },
          {
            label: secondPeriodLabel,
            data: dataSecond,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };

      setRadarData(newRadarData);
    }
  }, [gradesDataFirst, gradesDataSecond, elements]);

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
        text: 'Сравнение рейтинга студента за периоды',
      },
    },
  };

  return (
    <div className='roza'>
      {isLoading ? (
        <LoadingIndicator text="Загрузка схемы..." />
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