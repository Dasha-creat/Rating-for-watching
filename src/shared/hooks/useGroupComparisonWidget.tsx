import { useState, useEffect } from "react";
import { fetchStudentsByGroup } from "../../entities/Student/index";
import { formatDate, fetchGradesByGroup, fetchGradesByDateRange } from "../../entities/Grade/index";

interface IGroup {
    id: string;
    name: string;
}

export const useGroupComparisonWidget = (groups: IGroup[]) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Array<{ name: string; id: string; }>>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [students, setStudents] = useState<Array<{ id: string; name: string; groupName: string;}>>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [showScheme, setShowScheme] = useState(false);
  const [groupGradesData, setGroupGradesData] = useState<Record<string, number>>({});
  const [studentGradesData, setStudentGradesData] = useState<Record<string, number>>({});

    useEffect(() => {
      const fetchStudents = async () => {
        if (!selectedGroupId) return;
  
        const groupName = groups.find(group => group.id === selectedGroupId)?.name;
        if (!groupName) return;
  
        try {
          const studentsData = await fetchStudentsByGroup(groupName);
          setStudents(studentsData.students);
          console.log("Fetched students:", studentsData.students);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
  
      fetchStudents();
    }, [selectedGroupId, groups]);

      const handleFetchGrades = async () => {
        if (!dateRange || !selectedSubjects.length || !selectedGroupId) {
          console.error("Missing required inputs to fetch grades.");
          return;
        }
    
        const [startDate, endDate] = dateRange.map(formatDate);
        const groupName = groups.find(group => group.id === selectedGroupId)?.name;
    
        if (!groupName) {
          console.error("Invalid group selection.");
          return;
        }
    
        try {
          const gradesData = await fetchGradesByGroup(groupName, selectedSubjects.map(sub => sub.id), startDate, endDate);
          setGroupGradesData(gradesData);
    
          if (selectedStudentId) {
            const studentName = students.find(student => student.id === selectedStudentId)?.id;
    
            if (studentName) {
              const studentData = await fetchGradesByDateRange(
                studentName,
                selectedSubjects.map(sub => sub.id),
                startDate,
                endDate
              );
              setStudentGradesData(studentData);
            }
          }
    
          console.log("Fetched grades:", { groupGrades: gradesData, studentGrades: studentGradesData });
          setShowScheme(true);
        } catch (error) {
          console.error("Error fetching grades:", error);
        }
      };
    
      const handleItemClick = (id: string) => {
        setSelectedStudentId(id);
      };

      return{
        selectedGroupId,
        setSelectedGroupId,
        setStudents,
        setSelectedStudentId,
        setShowScheme,
        students,
        handleItemClick,
        setSelectedSubjects,
        dateRange,
        setDateRange,
        handleFetchGrades,
        selectedSubjects,
        selectedStudentId,
        showScheme,
        groupGradesData,
        studentGradesData,
      }
}