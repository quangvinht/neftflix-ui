import axios from 'axios';
import queryString from 'query-string';
import apiConfig from '~/api';

const httpRequest = axios.create({
    baseURL: apiConfig.baseUrl,
    header: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

httpRequest.interceptors.request.use(async (path) => path);

httpRequest.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        throw error;
    },
);

export default httpRequest;
