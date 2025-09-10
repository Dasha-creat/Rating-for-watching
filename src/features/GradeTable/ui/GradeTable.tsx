import React from 'react';
import { GradeTable } from '../../../shared/ui/index';

interface ISubject {
  id: string;
  name: string;
}

interface IGradeData {
  [subjectId: string]: {
    [date: string]: string | number | "";
  };
}

interface ITable {
  subjects: ISubject[];
  dates: string[];
  gradesData: IGradeData;
  onGradeChange: (subjectId: string, date: string, newGrade: string | number | "") => void;
  visibleDates: number;
}

export const Table: React.FC<ITable> = ({ subjects, dates, gradesData, onGradeChange, visibleDates }) => {
  return (
    <GradeTable
      subjects={subjects}
      dates={dates}
      gradesData={gradesData}
      onGradeChange={onGradeChange}
      visibleDates={visibleDates}
    />
  );
};