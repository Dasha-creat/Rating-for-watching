import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStudent } from '../../entities/Student/index';
import { fetchSubjects, Subject } from '../../entities/Subject/index';
import { fetchGradesByDate, fetchGradesByDateRange, updateGrade, formatDate, getDateRangeArray } from '../../entities/Grade/index.tsx';
import { format } from 'date-fns';

interface IGradeData {
  [subjectId: string]: {
    [date: string]: number;
  };
}

interface ISubjectData {
  id: string;
  name: string;
}

export const useStudentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [studentId, setStudentId] = useState<string>('');  
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState<Subject[]>([]);
  const [gradesData, setGradesData] = useState<IGradeData>({});
  const [totalGradesData, setTotalGradesData] = useState<{ [subjectId: string]: number }>({});
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [tempDateRange, setTempDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>([]);
  const [visibleDates, setVisibleDates] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadStudent = async () => {
      if (!id) return;
      const student = await fetchStudent(id);
      setStudentId(student.id); 
    };

    const loadSubjects = async () => {
      const subjects: ISubjectData[] = await fetchSubjects();
      setAllSubjects(subjects.map(sub => new Subject(sub.id, sub.name)));
    };

    loadStudent();
    loadSubjects();
  }, [id]);

  const handleGradeChange = async (subjectId: string, date: string, newGrade: string | number | "") => {
    const gradeToSend = newGrade === ''  ? 0 : Number(newGrade);
    await updateGrade(id!, subjectId, date, gradeToSend);
    setGradesData(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [date]: gradeToSend,
      }
    }));
  };

  const handleShowTable = async () => {
    setSelectedSubjects(tempSelectedSubjects);
    setDateRange(tempDateRange);
    setShowTable(true);
    setIsLoading(true);
  
    const calculatedDates = getDateRangeArray(tempDateRange[0], tempDateRange[1]).map(formatDate);
    setDates(calculatedDates);
    setVisibleDates(calculatedDates.length);
  
    const subjectIds = tempSelectedSubjects.map(subject => subject.id);
  
    try {
      const startDate = format(tempDateRange[0], 'yyyy-MM-dd');
      const endDate = format(tempDateRange[1], 'yyyy-MM-dd');
  
      const gradesByDate = await fetchGradesByDate(id!, subjectIds, startDate, endDate);
      setGradesData(gradesByDate);
  
      const gradesByDateRange = await fetchGradesByDateRange(id!, subjectIds, startDate, endDate);
      setTotalGradesData(gradesByDateRange);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  
    setIsLoading(false);
  };

  const handleDateRangeChange = (date: Date | [Date, Date] | null) => {
    if (Array.isArray(date) && date.length === 2) {
      setTempDateRange(date);
    }
  };

  return {
    studentId,
    allSubjects,
    selectedSubjects,
    tempSelectedSubjects,
    setTempSelectedSubjects,
    gradesData, 
    totalGradesData,
    dateRange,
    tempDateRange,
    handleDateRangeChange,
    showTable,
    handleShowTable,
    isLoading,
    dates,
    visibleDates,
    handleGradeChange,
  };
};