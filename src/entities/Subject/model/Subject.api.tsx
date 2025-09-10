import axios from 'axios';
import { Api } from '../../../shared/config/index';

interface ISubjectData {
  id: string;
  name: string;
}

export const fetchSubjects = async (): Promise<ISubjectData[]> => {
  const response = await axios.get<ISubjectData[]>(`${Api}/subjects`);
  return response.data;
};