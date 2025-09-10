import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroup } from '../../entities/Group/index';
import { fetchSubjects, Subject } from '../../entities/Subject/index';
import { fetchGradesByDateRangeForGroup } from '../../entities/GradeGroup/index';

interface GradeData {
  [subjectId: string]: number;
}

interface SubjectData {
  id: string;
  name: string;
}

export const useGroupPage = () => {
  const { name } = useParams<{ name: string }>();
  const [groupName, setGroupName] = useState<string>('');
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState<Subject[]>([]);
  const [gradesData, setGradesData] = useState<GradeData>({});
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [tempDateRange, setTempDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadGroup = async () => {
      try {
        const group = await fetchGroup(name as string);
        setGroupName(group.name);
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    };

    const loadSubjects = async () => {
      try {
        const subjects: SubjectData[] = await fetchSubjects();
        setAllSubjects(subjects.map(sub => new Subject(sub.id, sub.name)));
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    loadGroup();
    loadSubjects();
  }, [name]);

  const handleShowData = async () => {
    setSelectedSubjects(tempSelectedSubjects);
    setDateRange(tempDateRange);
    setIsLoading(true);
  
    const subjectIds = tempSelectedSubjects.map(subject => subject.id);
    const [startDate, endDate] = tempDateRange;
  
    const newGradesData: GradeData = {};
  
    try {
      for (const subjectId of subjectIds) {
        const grade = await fetchGradesByDateRangeForGroup(
          name as string,
          subjectId,
          startDate,
          endDate
        );

        if (grade && typeof grade === 'number') {
          newGradesData[subjectId] = grade;
        }
      }
  
      setGradesData(newGradesData);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
