/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Hr from '../components/Hr';
import Input from '../components/Input';
import { api, errHandler } from '../API';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');
const ResetPassword = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [ user, setUser ] = useState({
        password: '',
        confirm_password: '',
    });

    const isValid = () => {
        if (validator.isEmpty(user?.password)) {
            Alert.alert('Password is required!', 'Please enter your password.');
            return false;
        }
        if (!validator.isStrongPassword(user?.password)) {
            Alert.alert('Password is weak!', 'Please enter a strong password that contains letters, numbers and a special character.');
            return false;
        }

        if (validator.isEmpty(user?.confirm_password)) {
            Alert.alert('Confirm Password is required!', 'Please re-enter your password.');
            return false;
        }
        if (!validator.equals(user?.confirm_password, user?.password)) {
            Alert.alert('Password not matched!', 'Please re-check the confirm password.');
            return false;
        }

        return true;
    };

    const onResetPassword = async () => {
        const validation = isValid();
        if (validation) {
            setLoading(true);

            try {
                const res = await api.put('/auth/reset_password', {
                    request_id: route?.params?.request_id,
                    password: user?.password,
                });

                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    gravity: 'center',
                    title: res.data?.title,
                    textBody: res.data?.message,
                    button: 'Okay',
                    onPressButton: () => navigation.replace('Login'),
                    onHide: () => navigation.replace('Login'),
                });
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };

    return (
        <Background noAuth>
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
                        value={user?.password}
                        labelText="Password"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(value) => setUser({ ...user, password: value })}
                        secure
                    />
                    <Input
                        value={user?.confirm_password}
                        labelText="Re-Enter Password"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(value) => setUser({ ...user, confirm_password: value })}
                        secure
                    />
                    <Br space={0.05} />
                    <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={onResetPassword}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default ResetPassword;
