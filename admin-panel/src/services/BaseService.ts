import axios from 'axios';
import appConfig from '@/configs/app.config';
import {TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY} from '@/constants/api.constant';
import {PERSIST_STORE_NAME} from '@/constants/app.constant';
import deepParseJson from '@/utils/deepParseJson';
import store, {signOutSuccess} from '../store';
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";

const unauthorizedCode = [401];
const successCode = [200, 201, 202];
const notFoundCode = [404];  // 404 - страница не найдена
const serverErrorCode = [500];  // 500 - ошибка сервера

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    withCredentials: true,
});

BaseService.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const {response} = error;

        console.log('response', response)

        // Обработка 401 - Unauthorized
        if (response?.data?.response?.message && response?.data.response?.message.includes('expired')) {
            notifications.show({message: 'You need to log in again', color: 'red'});
            store.dispatch(signOutSuccess());
            window.location.href = '/sign-in'
            return Promise.reject(error);
        }

        // Обработка успешных ответов
        if (response && !successCode.includes(response.status)) {
            notifications.show({message: response.data?.response?.message || 'Something went wrong', color: 'red'});
        }

        console.log('123123')
        if (response && (unauthorizedCode.includes(response.status)) || response.message) {
            notifications.show({message: 'You need to log in again', color: 'red'});
            store.dispatch(signOutSuccess());
            window.location.href = '/sign-in'
            return Promise.reject(error);
        }

        // Обработка 404 - Not Found
        if (response && notFoundCode.includes(response.status)) {
            notifications.show({message: 'Resource not found (404)', color: 'orange'});
        }

        // Обработка 500 - Internal Server Error
        if (response && serverErrorCode.includes(response.status)) {
            notifications.show({message: 'Server error (500)', color: 'red'});
        }

        // Если ответ не пришел
        if (!response) {
            notifications.show({message: 'The server is unavailable or a network error has occurred', color: 'red'});
        }

        return Promise.reject(error);
    }
);

export default BaseService;
