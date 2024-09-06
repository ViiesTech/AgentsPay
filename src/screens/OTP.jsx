/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Hr from '../components/Hr';
import OTPInput from '../components/OTPInput';
import Backbtn from '../components/Backbtn';
import { api, errHandler } from '../API';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');
const OTPScreen = ({ navigation, route }) => {
    const validator = require('validator');
    const [OTP, setOTP] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = () => {
        if (validator.isEmpty(OTP)) {
            Alert.alert('OTP is required!', 'Please enter the OTP you received.');
            return false;
        }
        if (OTP.toString().length < 6) {
            Alert.alert('OTP is not valid!', 'Please enter a valid OTP.');
            return false;
        }

        return true;
    };
    const verifyOTP = async () => {
        const validation = isValid();
        if (validation) {
            setLoading(true);

            try {
                const res = await api.post('/auth/verify_otp', {
                    request_id: route?.params?.request_id,
                    otp: OTP,
                });
                Toast.show(res.data?.title, Toast.SHORT);
                navigation.replace('ResetPassword', { request_id: route?.params?.request_id });
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };

    return (
        <Background noAuth>
            <Backbtn onPress={() => navigation.goBack()} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.05} />
                <View style={{width: width * 0.85, alignItems: 'center', flex: 1}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Enter OTP</H5>
                    <Pera theme="transparent" style={{textAlign: 'center'}}>We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.02} />
                    <OTPInput inputs={6} onComplete={(otp) => setOTP(otp)} />
                    <Br space={0.05} />
                    <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={verifyOTP}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default OTPScreen;
