import axios from 'axios';
import { Alert } from 'react-native';

const basUrl = 'http://192.168.18.190:8080';
export const api = axios.create({
    baseURL: basUrl,
    timeout: 5000,
});

export const errHandler = async (err) => {
    const status = err?.response?.status;
    if (status === 417 || status === 500 || status === 406)
    {
        // 417 VALIDATION ERROR
        // 417 INTERNAL SERVER/DATABASE ERROR
        Alert.alert(
            err.response.data?.title,
            err.response.data?.message
        );
    }else
    if (status === 404) // NOT FOUND
    {
        Alert.alert(
            err.response.data?.title,
            err.response.data?.message
        );
    }else {
        Alert.alert(
            'Unknown Error',
            'Please contact IT Support.'
        );
    }
};
