import React, { useMemo } from 'react';
import { TableCell } from '../../../../entities/Grade/index';
import './GradeTable.css';

interface ISubject {
  id: string;
  name: string;
}

interface IGradeData {
  [subjectId: string]: {
    [date: string]: string | number | "";
  };
}

interface IGradeTable {
  subjects: ISubject[];
  dates: string[];
  gradesData: IGradeData;
  onGradeChange: (subjectId: string, date: string, newGrade: string | number | "") => void;
  visibleDates: number;
}

export const GradeTable: React.FC<IGradeTable> = React.memo(({ subjects, dates, gradesData, onGradeChange, visibleDates }) => {
  if (subjects.length < 3) {
    return null;
  }

  const headers = useMemo(
    () => dates.slice(0, visibleDates).map((date, idx) => (
      <th key={idx} className="dates-th">
        {date}
      </th>
    )),
    [dates, visibleDates]
  );

  return (
    <div className="div-table">
      <table className="table">
        <thead>
          <tr>
            <th className="title-th">Предмет/Дата</th>
            {headers}
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td className="subject-td">{subject.name}</td>
              {dates.slice(0, visibleDates).map((date) => (
                <td key={date} className="date-td">
                  <TableCell
                    initialValue={gradesData[subject.id]?.[date] || ''}
                    onValueChange={(newValue) => onGradeChange(subject.id, date, newValue)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});