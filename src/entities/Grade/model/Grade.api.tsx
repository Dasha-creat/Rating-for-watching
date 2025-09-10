import axios from 'axios';
import { Api } from '../../../shared/config/index';

interface IGradeTotal {
  subjectId: string;
  total: number;
}

interface IGradeData {
  [subjectId: string]: number;
}

interface IData {
  [subjectId: string]: { [date: string]: number };
}

interface IGrade {
  subjectId: string;
  date: string;
  grade: number;
}

export const fetchGradesByDateRange = async (
  studentId: string | undefined,
  subjectIds: string[],
  startDate: string,
  endDate: string
): Promise<IGradeData> => {
  const gradesData: IGradeData = {};

  try {
    const fetchPromises = subjectIds.map(subjectId =>
      axios.get(`${Api}/grades/student/${studentId}/subject/${subjectId}/date-range/${startDate}/${endDate}/total`)
        .then(response => {
          const total = typeof response.data === 'number' ? response.data : response.data.total || 0;
          return { subjectId, total } as IGradeTotal;
        })
    );

    const results = await Promise.all(fetchPromises);

    results.forEach(({ subjectId, total }) => {
      gradesData[subjectId] = total;
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
  }

  return gradesData;
};

export const updateGrade = async (
  studentId: string,
  subjectId: string,
  date: string,
  grade: number
): Promise<void> => {
  try {
    await axios.put(`${Api}/grades/student/${studentId}/subject/${subjectId}/date/${date}/grade/${grade}`);
    console.log(grade)
  } catch (error) {
    console.error("Error updating grade:", error);
  }
};

export const fetchGradesByDate = async (
  studentId: string,
  subjectIds: string[],
  startDate: string,
  endDate: string
): Promise<IData> => {  
  const gradesData: IData = {}; 

  try {
    const fetchPromises = subjectIds.map(subjectId =>
      axios.get(`${Api}/grades/student/${studentId}/subject/${subjectId}/date-range/${startDate}/${endDate}`)
        .then(response => ({
          subjectId,
          grades: response.data || []
        }))
    );

    const results = await Promise.all(fetchPromises);

    results.forEach(({ subjectId, grades }) => {
      if (!gradesData[subjectId]) gradesData[subjectId] = {};
      grades.forEach((grade: IGrade) => {
        gradesData[subjectId][grade.date] = grade.grade;
      });
    });
  } catch (error) {
    console.error("Error fetching detailed grades:", error);
  }

  return gradesData;
};

export const fetchGradesByGroup = async (
  groupName: string,
  subjectIds: string[],
  startDate: string,
  endDate: string
): Promise<IGradeData> => {
  const gradesData: IGradeData = {};

  try {
    const fetchPromises = subjectIds.map(subjectId =>
      axios.get(`${Api}/grades/group/${groupName}/subject/${subjectId}/daterange/${startDate}/${endDate}/average`)
        .then(response => {
          const total = typeof response.data === 'number' ? response.data : response.data.total || 0;
          return { subjectId, total } as IGradeTotal;
        })
    );

    const results = await Promise.all(fetchPromises);

    results.forEach(({ subjectId, total }) => {
      gradesData[subjectId] = total;
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
  }

  return gradesData;
};