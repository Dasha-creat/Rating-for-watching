import axios from "axios";
import { Api } from '../../config/index';

export const fetchStudents = async () => {
    const response = await axios.get(`${Api}/students`);
    return response.data;
}