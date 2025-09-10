import React from 'react';
import './SelectedInfo.css';

interface IElement {
  id: string;
  name: string;
}

interface ISelectedInfo {
  selectedItems: IElement[];
  dateRange: [Date, Date] | null;
  formatDateRange: (dateRange: [Date, Date]) => string;
}

export const SelectedInfo: React.FC<ISelectedInfo> = ({ selectedItems, dateRange, formatDateRange }) => {
  return (
    <div className="custom-tooltip">
      <h3 className="header-criterion">Выбранные критерии</h3>
      <ul>
        {selectedItems.map((element, index) => (
          <li key={index}>{element.name}</li>
        ))}
      </ul>
      {Array.isArray(dateRange) && dateRange.length === 2 && (
        <div className="period-div">
          <h3 className="header-period ">Выбранный период</h3>
          <p>{formatDateRange(dateRange)}</p>
        </div>
      )}
    </div>
  );
};