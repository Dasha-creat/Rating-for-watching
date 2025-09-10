import React from 'react';
import { SubjectSelectButton } from '../../../features/ChoiceSubject/index';
import { RozaScheme } from '../../../features/GradeScheme/index';
import { GradeCalendar } from '../../../features/Calendar/index';
import { TwoStudentsSelectButton } from '../../../features/ChoiceCompareStudents';
import './SelectionControls.css';
import { RozaSchemeForTwo } from '../../../features/GradeSchemeForTwo';


interface ISelectionControlsProps {
  labelName?: string;
  allSubjects: { id: string; name: string }[]; 
  selectedSubjects: { id: string, name: string }[]; 
  onSubjectChange: (selectedItems: { id: string, name: string }[]) => void;
  dateRange: [Date, Date] | null;
  onDateRangeChange: (date: Date | [Date, Date] | null) => void;
  onShowTable: () => void;
  gradesData: { [subjectId: string]: number };
  gradesForTwo?:  { [studentId: string]: { [subjectId: string]: number;}; };
  isLoading: boolean;
  showTwoStudentsSelectButton?: boolean; 
  elements?: { id: string; name: string }[];
  onStudentsChange?: (selectedStudents: { id: string; name: string }[]) => void; 
}

export const SelectionControls: React.FC<ISelectionControlsProps> = ({
  labelName,
  allSubjects,
  selectedSubjects,
  onSubjectChange,
  dateRange,
  onDateRangeChange,
  onShowTable,
  gradesData,
  gradesForTwo,
  isLoading,
  showTwoStudentsSelectButton = false,
  elements = [],
  onStudentsChange,
}) => {
  const handleStudentsChange = (students: { id: string; name: string }[]) => {
    if (onStudentsChange) {
      onStudentsChange(students);
    }
  };

  return (
    <div className="main-container">
      <div className="info-container">
        {showTwoStudentsSelectButton ? (
          <TwoStudentsSelectButton elements={elements} onStudentsChange={handleStudentsChange} />
        ) : (
          <span className="five span-name button">{labelName}</span>
        )}

        <SubjectSelectButton
          items={allSubjects}
          onChange={onSubjectChange}
          title="Выбрать критерий"
        />

        <GradeCalendar
          value={dateRange}
          onChange={onDateRangeChange}
          title="Выбрать период"
        />

        <button
          className="button button-end custom-button"
          onClick={onShowTable}
          disabled={selectedSubjects.length < 3}
        >
          Вывод
        </button>
      </div>

      {showTwoStudentsSelectButton ? (
          <RozaSchemeForTwo
          gradesForTwo={gradesForTwo}
          elements={selectedSubjects}
          isLoading={isLoading}
          />
        ) : (
          <RozaScheme
          gradesData={gradesData}
          elements={selectedSubjects}
          isLoading={isLoading}
        />
        )}

    </div>
  );
};