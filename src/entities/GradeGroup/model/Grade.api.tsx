import axios from 'axios';
import { Api } from '../../../shared/config/index';
import { formatDate } from '../../../shared/utils'; 

interface IGroupGrade {
  grade: number;
  studentId: string;
  subjectId: string;
  date: string;
}

export const fetchGradesByDateRangeForGroup = async (
  groupId: string,
  subjectId: string,
  startDate: Date,
  endDate: Date
): Promise<IGroupGrade[]> => {
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  const response = await axios.get<IGroupGrade[]>(
    `${Api}/grades/group/${groupId}/subject/${subjectId}/date-range/${startDateStr}/${endDateStr}/total`
  );

  return response.data;
};
