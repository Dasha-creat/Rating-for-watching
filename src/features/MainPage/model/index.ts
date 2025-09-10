import axios from 'axios'
import { Api } from '../../../shared/config/index.tsx'

interface Students {
  name: string;
  id: string;
  groupName: string;
};

interface Groups {
  name: string;
  id: number;
}

export async function fetchElements(
  setElements: (students: Students[]) => void,
  setGroups: (groups: Groups[]) => void
): Promise<void> {
  try {
    const response = await axios.get<Students[]>(`${Api}/students`)
    const responseGroup = await axios.get<Groups[]>(`${Api}/groups`)
    setElements(response.data)
    setGroups(responseGroup.data)
  } catch (error) {
    console.error('Error fetching elements', error)
  }
}