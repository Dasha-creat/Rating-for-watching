import { useNavigate } from 'react-router-dom';
import { SelectionControls, SelectedInfo } from '../../../widgets/index.tsx';
import { BackButton } from '../../../shared/ui/index';
import { formatDateRange } from '../../../shared/utils/index';
import { useGroupPage } from '../../../shared/hooks/useGroupPage';
import './GroupPage.css';

export const GroupPage: React.FC = () => {
  const {
    groupName,
    allSubjects,
    selectedSubjects,
    tempSelectedSubjects,
    setTempSelectedSubjects,
    gradesData,
    dateRange,
    tempDateRange,
    setTempDateRange,
    handleShowData,
    isLoading,
  } = useGroupPage();

  const navigate = useNavigate();

  const handleDateRangeChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date) && date.length === 2) {
      setTempDateRange(date);
    }
  };

  return (
    <div>
      <BackButton onClick={() => navigate(-1)} disabled={false}> Вернуться назад </BackButton>
        
      <SelectedInfo 
        selectedItems={selectedSubjects} 
        dateRange={dateRange} 
        formatDateRange={formatDateRange} 
      />

      <SelectionControls 
        labelName={groupName}
        allSubjects={allSubjects}
        selectedSubjects={tempSelectedSubjects} 
        onSubjectChange={setTempSelectedSubjects}
        dateRange={tempDateRange}
        onDateRangeChange={handleDateRangeChange}
        onShowTable={handleShowData} 
        gradesData={gradesData}
        isLoading={isLoading}
      />
    </div>
  );
};
