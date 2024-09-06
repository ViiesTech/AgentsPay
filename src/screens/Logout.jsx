/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View } from 'react-native';

const Logout = ({ navigation }) => {
    useEffect(() => {
        hasToken();
    }, []);

    const hasToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.replace('Login');
        }
    };
    return (
        <View />
    );
};

export default Logout;
