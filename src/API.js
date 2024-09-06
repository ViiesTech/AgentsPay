import axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';

export const baseUrl = 'http://192.168.18.190:8080';
export const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
});

export const errHandler = async (err) => {
    const status = err?.response?.status;
    if (status === 417 || status === 500 || status === 406 || status === 502 || status === 401)
    {
        // 417 VALIDATION ERROR
        // 417 INTERNAL SERVER/DATABASE ERROR
        // 500 INTERNAL SERVER/DATABASE ERROR
        // 406 NOT ACCEPTABLE
        // 502 BAD GATEWAY
        // 401 UNAUTHORIZED
        Alert.alert(
            err.response.data?.title,
            err.response.data?.message
        );
    }else
    if (status === 404) // NOT FOUND
    {
        const calledAPI = err?.response?.config?.url;
        Alert.alert(
            'Unknown API Called',
            'Please make sure that the API (' + calledAPI + ") you're calling is already exists!",
        );
    }else
    if (status === 511) // MALFORMED TOKEN
    {
        Toast.show('Your session has been ended!!', Toast.SHORT);
        RNRestart.restart();
    }else {
        Alert.alert(
            'Unknown Error',
            'Please contact IT Support.'
        );
    }
};
