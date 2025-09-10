import axios from 'axios';
import { Api } from '../../../shared/config/index';

interface IGroup {
  id: string;
  name: string;
}

export const fetchGroup = async (id: string): Promise<IGroup> => {
  const response = await axios.get<IGroup>(`${Api}/groups/${id}`);
  return response.data;
};
