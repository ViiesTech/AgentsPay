/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Hr from '../components/Hr';
import Input from '../components/Input';

const { width, height } = Dimensions.get('window');
const ResetPassword = ({ navigation }) => {
    return (
        <Background>
            <View style={{height: height * 0.9, width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.05} />
                <View style={{width: width * 0.85, alignItems: 'center', flex: 1}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Enter New Password</H5>
                    <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter your new password to reset password</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.02} />
                    <Input
                        labelText="Password"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(emailAddress) => console.log(emailAddress)}
                        secure
                    />
                    <Input
                        labelText="Re-Enter Password"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(emailAddress) => console.log(emailAddress)}
                        secure
                    />
                    <Br space={0.05} />
                    <ButtonOutline style={{width: width * 0.85}} onPress={() => navigation.replace('Login')}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default ResetPassword;
