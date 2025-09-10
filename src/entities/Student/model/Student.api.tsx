import axios from 'axios'
import { Api } from '../../../shared/config/index'

interface IStudentData {
  id: string;
  name: string;
  groupName: string;
}

interface IGroupData {
  id: string;
  name: string;
  students: IStudentData[];
}

export const fetchStudent = async (id: string): Promise<IStudentData> => {
  const response = await axios.get<IStudentData>(`${Api}/students/${id}`)
  return response.data
}

export const fetchStudentsByGroup = async (groupName: string): Promise<IGroupData> => {
  const response = await axios.get<IGroupData>(`${Api}/groups/${groupName}`);
  return response.data;
};