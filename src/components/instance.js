import axios from 'axios';
import {API_URL, API_KEY} from '../constants/constants';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    params: {
        api_key: API_KEY,
        language: 'ko-KR',
    }
});

export default instance;