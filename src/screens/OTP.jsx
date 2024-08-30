/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Hr from '../components/Hr';
import OTPInput from '../components/OTPInput';
import Backbtn from '../components/Backbtn';

const { width, height } = Dimensions.get('window');
const OTP = ({ navigation }) => {
    return (
        <Background>
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
                    <OTPInput inputs={6} onComplete={(enteredOTP) => Alert.alert('Entered OTP', enteredOTP)} />
                    <Br space={0.05} />
                    <ButtonOutline style={{width: width * 0.85}} onPress={() => navigation.navigate('ResetPassword')}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default OTP;
