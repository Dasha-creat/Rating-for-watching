import { useState, useEffect } from 'react';
import { fetchSubjects, Subject } from '../../entities/Subject/index';
import { fetchGradesByDateRange, formatDate, getDateRangeArray } from '../../entities/Grade/index.tsx';
import { Student } from '../../entities/Student/index';

interface GradeData {
  [subjectId: string]: number;
}

interface IGradesForTwo {
    [studentId: string]: { 
        [subjectId: string]: number;
    };
}

interface SubjectData {
  id: string;
  name: string;
}

export const usecomparePage = () => {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState<Subject[]>([]);
  const [gradesData, setGradesData] = useState<GradeData>({});
  const [gradesForTwo, setGradesForTwo] = useState<IGradesForTwo>({});
  const [tempDateRange, setTempDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);


  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const subjects: SubjectData[] = await fetchSubjects();
        setAllSubjects(subjects.map((sub) => new Subject(sub.id, sub.name)));
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    loadSubjects();
  }, []);

  const handleShowData = async () => {
    if (selectedStudents.length === 0) {
      console.error("No students selected");
      return;
    }

    setIsLoading(true);

    const formattedDates = getDateRangeArray(tempDateRange[0], tempDateRange[1]).map(formatDate);
    const startDate = formattedDates[0];
    const endDate = formattedDates[formattedDates.length - 1];
    const subjectIds = tempSelectedSubjects.map((subject) => subject.id);

    try {
      const allGradesData: GradeData = {};
      const allGradesForTwo: IGradesForTwo = {};

      for (const student of selectedStudents) {
        const studentId = student.id;

        const gradesBySubject = await fetchGradesByDateRange(
          studentId.toString(),
          subjectIds,
          startDate,
          endDate
        );

        console.log(gradesBySubject)

        if (!allGradesForTwo[studentId]) {
          allGradesForTwo[studentId] = {};
        }

        for (const subjectId in gradesBySubject) {
          const totalGrade = gradesBySubject[subjectId] || 0;
          allGradesData[subjectId] = (allGradesData[subjectId] || 0) + totalGrade;
          allGradesForTwo[studentId][subjectId] = totalGrade;
        }
      }

      setGradesData(allGradesData);
      setGradesForTwo(allGradesForTwo);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    allSubjects,
    tempSelectedSubjects,
    setTempSelectedSubjects,
    gradesData,
    gradesForTwo,
    tempDateRange,
    setTempDateRange,
    handleShowData,
    isLoading,
    selectedStudents,
    setSelectedStudents,
  };
};