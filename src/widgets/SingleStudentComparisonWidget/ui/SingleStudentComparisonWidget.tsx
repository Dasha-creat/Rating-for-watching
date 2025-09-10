import React, { useState } from 'react';
import { StudentSelectButton } from '../../../features/ChoiceStudent';
import { SubjectSelectButton } from '../../../features/ChoiceSubject';
import { GradeCalendar } from '../../../features/Calendar';
import { fetchGradesByDateRange } from '../../../entities/Grade';
import { RozaSchemeForPeriods } from '../../../features/GradeShemeForPeriods/index'; 
import { formatDate, formatDateRange } from '../../../shared/utils';
import './SinglestudentComparisonWidget.css';

interface IStudent {
  id: string;
  name: string;
  groupName: string;
}

interface ISubject {
  id: string;
  name: string;
}

interface IGradesData {
  [subjectId: string]: number;
}

interface ISingleStudentComparisonWidgetProps {
  students: IStudent[];
  subjects: ISubject[];
}

export const SingleStudentComparisonWidget: React.FC<ISingleStudentComparisonWidgetProps> = ({ students, subjects }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<ISubject[]>([]);
  const [firstDateRange, setFirstDateRange] = useState<[Date, Date] | null>([today, today]);
  const [secondDateRange, setSecondDateRange] = useState<[Date, Date] | null>([today, today]);
  const [gradesDataFirst, setGradesDataFirst] = useState<IGradesData>({});
  const [gradesDataSecond, setGradesDataSecond] = useState<IGradesData>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const firstPeriodLabel = formatDateRange(firstDateRange);
  const secondPeriodLabel = formatDateRange(secondDateRange);

  const handleDateRangeChange = (setDateRange: React.Dispatch<React.SetStateAction<[Date, Date] | null>>) => (date: Date | [Date, Date] | null) => {
    if (date === null) {
      setDateRange([today, today]);
    } else if (date instanceof Date) {
      setDateRange([date, today]);
    } else {
      setDateRange(date);
    }
  };

  const handleFetchData = async () => {
    if (!selectedStudent || selectedSubjects.length < 3 || !firstDateRange || !secondDateRange) {
      return;
    }

    setIsLoading(true);

    try {
      const subjectIds = selectedSubjects.map(subject => subject.id);

      const firstStart = formatDate(firstDateRange[0]);
      const firstEnd = formatDate(firstDateRange[1]);
      const secondStart = formatDate(secondDateRange[0]);
      const secondEnd = formatDate(secondDateRange[1]);

      const [gradesFirst, gradesSecond] = await Promise.all([
        fetchGradesByDateRange(selectedStudent.id, subjectIds, firstStart, firstEnd),
        fetchGradesByDateRange(selectedStudent.id, subjectIds, secondStart, secondEnd),
      ]);

      setGradesDataFirst(gradesFirst);
      setGradesDataSecond(gradesSecond);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="info-container">

        <StudentSelectButton
          elements={students}
          onSelect={(id) => setSelectedStudent(students.find(student => student.id === id) || null)}
          title="Выбрать студента"
        />
        
        <SubjectSelectButton
          items={subjects}
          onChange={setSelectedSubjects}
          title="Выбрать предметы"
        />

        <GradeCalendar
          value={firstDateRange}
          onChange={handleDateRangeChange(setFirstDateRange)}
          title="Выбрать первый период"
        />

        <GradeCalendar
          value={secondDateRange}
          onChange={handleDateRangeChange(setSecondDateRange)}
          title="Выбрать второй период"
        />

        <button className="button button-end custom-button" onClick={handleFetchData} disabled={!selectedStudent || selectedSubjects.length < 3}>
          Вывод
        </button>
      </div>

      <div>
        <RozaSchemeForPeriods
          gradesDataFirst={gradesDataFirst}
          gradesDataSecond={gradesDataSecond}
          elements={selectedSubjects}
          isLoading={isLoading}
          firstPeriodLabel={firstPeriodLabel}
          secondPeriodLabel={secondPeriodLabel}
        />
      </div>
    </div>
  );
};
