import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../shared/ui/index';
import { SelectionControls } from '../../../widgets';
import { usecomparePage } from '../../../shared/hooks/useComparePage';
import { SingleStudentComparisonWidget } from '../../../widgets/SingleStudentComparisonWidget';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { GroupComparisonWidget } from '../../../widgets/GroupComparisonWidget';

export const ComparePage: React.FC = () => {
  const {
    allSubjects,
    tempSelectedSubjects,
    setTempSelectedSubjects,
    gradesData,
    gradesForTwo,
    tempDateRange,
    setTempDateRange,
    handleShowData,
    isLoading,
    setSelectedStudents,
  } = usecomparePage();

  const navigate = useNavigate();

  const students = useSelector((state: RootState) => state.mainPage.students);
  const groups = useSelector((state: RootState) => state.mainPage.groups);

  const handleDateRangeChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date) && date.length === 2) {
      setTempDateRange(date);
    }
  };

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} disabled={false}> Вернуться назад </BackButton>

      <SelectionControls 
        showTwoStudentsSelectButton={true} 
        elements={students}
        allSubjects={allSubjects}
        selectedSubjects={tempSelectedSubjects} 
        onSubjectChange={setTempSelectedSubjects}
        dateRange={tempDateRange}
        onDateRangeChange={handleDateRangeChange}
        onShowTable={handleShowData}
        gradesData={gradesData} 
        gradesForTwo={gradesForTwo}
        isLoading={isLoading}
        onStudentsChange={setSelectedStudents}
      />

      <SingleStudentComparisonWidget 
        students={students}
        subjects={allSubjects}
      />

      <GroupComparisonWidget
      groups={groups}
      subjects={allSubjects}
      />

    </div>
  );
};