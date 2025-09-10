import axios from "axios";
import { Api } from '../../config/index';

export const fetchGroups = async () => {
        const response = await axios.get(`${Api}/groups`);
        return response.data;
}