/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { Button, ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-simple-toast';
import Backbtn from '../components/Backbtn';
import { api, errHandler } from '../API';
import DeviceInfo from 'react-native-device-info';
import { connectFirebase } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const Login = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [FCM, setFCM] = useState();
    const [Device, setDevice] = useState();
    const [ user, setUser ] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (route?.params?.email.length > 0) {setUser({...user, email: route?.params?.email.toLowerCase()});}
    }, [route?.params?.email]);
    useEffect(() => {
        getDeviceInfo();
        getFCM();
    }, []);

    async function getFCM() {
        await connectFirebase(setFCM);
    }

    const getDeviceInfo = async () => {
        const buildId = await DeviceInfo.getBuildId();
        const brand = await DeviceInfo.getBrand();
        const deviceName = await DeviceInfo.getDeviceName();
        const ipAddress = await DeviceInfo.getIpAddress();
        const manufacturer = await DeviceInfo.getManufacturer();
        const version = await DeviceInfo.getVersion();
        const readableVersion = await DeviceInfo.getReadableVersion();
        const systemName = await DeviceInfo.getSystemName();
        const systemVersion = await DeviceInfo.getSystemVersion();
        const isTablet = await DeviceInfo.isTablet();
        setDevice(
            {
                'buildId': buildId,
                'brand': brand,
                'deviceName': deviceName,
                'ipAddress': ipAddress,
                'manufacturer': manufacturer,
                'version': version,
                'readableVersion': readableVersion,
                'systemName': systemName,
                'systemVersion': systemVersion,
                'isTablet': isTablet,
            }
        );
    };

    const isValid = () => {
        if (validator.isEmpty(user?.email)) {
            Alert.alert('Email is required!', 'Please enter your email.');
            return false;
        }
        if (!validator.isEmail(user?.email)) {
            Alert.alert('Email is not valid!', 'Please enter your valid email address.');
            return false;
        }

        if (validator.isEmpty(user?.password)) {
            Alert.alert('Password is required!', 'Please enter your password.');
            return false;
        }

        if (!FCM) {
            Alert.alert('FCM Not Found!', 'Please close and reopen the app!');
            return false;
        }

        return true;
    };
    const onSignin = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);
            try {
                const res = await api.post('/auth/signin', {
                    email: user?.email,
                    password: user?.password,
                    deviceInfo: JSON.stringify(Device),
                    fcm: FCM,
                });

                await AsyncStorage.setItem(
                    'token',
                    res.data?.data?.token
                );

                Toast.show(res.data?.title, Toast.SHORT);
                if (res.data?.data?.is_profile_completed) {
                    if (res.data?.data?.is_subscription_activated) {
                        navigation.replace('Home');
                    }else {
                        navigation.replace('Subscriptions');
                    }
                }else {
                    navigation.replace('CompleteProfile');
                }
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };
    return (
        <Background noAuth>
            <Backbtn onPress={() => navigation.goBack()} />
            <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
            <Br space={0.03} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Welcome back,</H5>
                <Br space={0.05} />
                <Input
                    defaultValue={route?.params?.email}
                    value={user?.email}
                    labelText="Email"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, email: value})}
                />
                <Input
                    value={user?.password}
                    labelText="Password"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, password: value})}
                    secure
                />
                <Br space={0.03} />
                <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={onSignin}>Sign In</ButtonOutline>
                <Br space={0.02} />
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 5}}>
                    <Pera theme="transparent">
                        Forgot your password?
                    </Pera>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Pera style={{color: Color('btnBackground'), fontFamily: 'Poppins-SemiBold'}}>Reset here</Pera>
                    </TouchableOpacity>
                </View>
                <Br space={0.07} />
                <Button style={{width: width * 0.85}} onPress={() => navigation.navigate('Signup')}>Create an Account</Button>
            </View>
        </Background>
    );
};

export default Login;
