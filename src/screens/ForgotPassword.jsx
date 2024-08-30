/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import Backbtn from '../components/Backbtn';
import Hr from '../components/Hr';

const { width, height } = Dimensions.get('window');
const ForgotPassword = ({ navigation }) => {
    return (
        <Background>
            <Backbtn onPress={() => navigation.goBack()} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.05} />
                <View style={{width: width * 0.85, alignItems: 'center', flex: 1}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Forgot Password</H5>
                    <Pera theme="transparent">Please enter your email to reset password</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.03} />
                    <Input
                        labelText="Email/ Phone number"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(emailAddress) => console.log(emailAddress)}
                    />
                    <Br space={0.04} />
                    <ButtonOutline style={{width: width * 0.85}} onPress={() => navigation.navigate('OTP')}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default ForgotPassword;
