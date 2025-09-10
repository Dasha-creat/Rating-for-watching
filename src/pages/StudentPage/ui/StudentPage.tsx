import { useNavigate } from 'react-router-dom';
import { BackButton, LoadingIndicator } from '../../../shared/ui/index';
import { SelectionControls, SelectedInfo } from '../../../widgets/index.tsx';
import { Table } from '../../../features/GradeTable/index';
import { useStudentPage } from '../../../shared/hooks/useStudentPage.tsx';
import { formatDateRange } from '../../../shared/utils/index';
import './StudentPage.css';

export const StudentPage: React.FC = () => {
  const {
    studentId,
    allSubjects,
    selectedSubjects,
    tempSelectedSubjects,
    setTempSelectedSubjects,
    gradesData, 
    totalGradesData,
    tempDateRange,
    handleDateRangeChange,
    showTable,
    handleShowTable,
    isLoading,
    dates,
    visibleDates,
    handleGradeChange,
  } = useStudentPage();

  const navigate = useNavigate();

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} disabled={false}> Вернуться назад </BackButton>

      <SelectedInfo 
        selectedItems={tempSelectedSubjects} 
        dateRange={tempDateRange} 
        formatDateRange={formatDateRange} 
      />

      <SelectionControls 
        labelName={studentId}
        allSubjects={allSubjects}
        selectedSubjects={tempSelectedSubjects} 
        onSubjectChange={setTempSelectedSubjects}
        dateRange={tempDateRange}
        onDateRangeChange={handleDateRangeChange}
        onShowTable={handleShowTable} 
        gradesData={totalGradesData}
        isLoading={isLoading}
      />  

      {showTable && (
        <div>
          {isLoading ? (
            <LoadingIndicator text="Загрузка таблицы оценок..." />
          ) : (
            <Table
              subjects={selectedSubjects}
              dates={dates}
              gradesData={gradesData}
              onGradeChange={handleGradeChange}
              visibleDates={visibleDates}
            />
          )}
        </div>
      )}
    </div>
  );
};