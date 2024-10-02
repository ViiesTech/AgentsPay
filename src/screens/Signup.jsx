/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H3, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { Button } from '../components/Button';
import Input from '../components/Input';
import CheckBox from '@react-native-community/checkbox';
import { api, errHandler } from '../API';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ShowAlert } from '../utils/Alert';

const { width, height } = Dimensions.get('window');
const Signup = ({ navigation, route }) => {
    const validator = require('validator');

    const [ user, setUser ] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValid = () => {
        if (validator.isEmpty(user?.full_name)) {
            ShowAlert('Full Name is required!', 'Please enter your full name.');
            return false;
        }
        if (user?.full_name?.length < 3) {
            ShowAlert('Full Name is not valid!', 'Name can only contains letters, minimum 3 letters are required.');
            return false;
        }

        if (validator.isEmpty(user?.email)) {
            ShowAlert('Email is required!', 'Please enter your email.');
            return false;
        }
        if (!validator.isEmail(user?.email)) {
            ShowAlert('Email is not valid!', 'Please enter your valid email address.');
            return false;
        }

        if (validator.isEmpty(user?.phone)) {
            ShowAlert('Phone number is required!', 'Please enter your phone number.');
            return false;
        }
        if (!validator.isMobilePhone(user?.phone, ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-PS', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'az-LB', 'az-LY', 'be-BY', 'bg-BG', 'bn-BD', 'bs-BA', 'ca-AD', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LU', 'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AU', 'en-BM', 'en-BS', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 'en-HK', 'en-IE', 'en-IN', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-LS', 'en-MO', 'en-MT', 'en-MU', 'en-MW', 'en-NG', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-SS', 'en-TZ', 'en-UG', 'en-US', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EC', 'es-ES', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-AF', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BJ', 'fr-CD', 'fr-CF', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF', 'fr-RE', 'fr-WF', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'ir-IR', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'ko-KR', 'ky-KG', 'lt-LT', 'mg-MG', 'mn-MN', 'ms-MY', 'my-MM', 'mz-MZ', 'nb-NO', 'ne-NP', 'nl-AW', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-AO', 'pt-BR', 'pt-PT', 'ro-Md', 'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'so-SO', 'sq-AL', 'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-UZ', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'])) {
            ShowAlert('Phone number is not valid!', 'Please enter your valid phone number.');
            return false;
        }

        if (validator.isEmpty(user?.password)) {
            ShowAlert('Password is required!', 'Please enter your password.');
            return false;
        }
        if (!validator.isStrongPassword(user?.password)) {
            ShowAlert('Password is weak!', 'Please enter a strong password that contains letters, numbers and a special character.');
            return false;
        }

        if (validator.isEmpty(user?.confirm_password)) {
            ShowAlert('Confirm Password is required!', 'Please re-enter your password.');
            return false;
        }
        if (!validator.equals(user?.confirm_password, user?.password)) {
            ShowAlert('Password not matched!', 'Please re-check the confirm password.');
            return false;
        }
        if (!agreeToTerms) {
            ShowAlert('Kindly Accept Our terms!', 'you need to agree our terms of use and privacy policy.');
            return false;
        }

        return true;
    };

    const onSignup = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);
            try {
                const res = await api.post('/auth/signup', {
                    full_name: user?.full_name.toString(),
                    email: user?.email.toString(),
                    phone: user?.phone.toString(),
                    password: user?.password.toString(),
                });

                if (route.name === 'Signup') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Great',
                        onPressButton: () => navigation.replace('Login', { email: user?.email }),
                        onHide: () => navigation.replace('Login', { email: user?.email }),
                    });
                }
            } catch(err) {
                setLoading(false);
                await errHandler(err);
            }
        }
    };
    return (
        <Background noAuth>
            <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
            <Br space={0.03} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <H3 theme="light" style={{fontFamily: 'Poppins-SemiBold', transform: [{translateY: height * 0.02}]}}>Create</H3>
                <H3 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>an Account</H3>
                <Br space={0.03} />
                <Input
                    value={user?.full_name}
                    labelText="Full Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, full_name: value})}
                />
                <Input
                    value={user?.email}
                    labelText="Email"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, email: value})}
                />
                <Input
                    value={user?.phone}
                    labelText="Phone"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, phone: value})}
                />
                <Input
                    value={user?.password}
                    labelText="Password"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, password: value})}
                    secure
                />
                <Input
                    value={user?.confirm_password}
                    labelText="Confirm Password"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, confirm_password: value})}
                    secure
                />
                <Br space={0.01} />
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <CheckBox
                        style={{ borderRadius: 10 }}
                        disabled={false}
                        value={agreeToTerms}
                        onValueChange={(event) => setAgreeToTerms(event)}
                        tintColor={Color('btnBackground')}
                        tintColors={{ true: Color('btnBackground'), false: Color('btnBackground') }}
                    />
                    <View style={{flexDirection: 'row', columnGap: 5, flexWrap: 'wrap', flex: 1}}>
                        <Small>By signing up, you agree to our</Small>
                        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                            <Small theme="light">privacy policy</Small>
                        </TouchableOpacity>
                        <Small>and</Small>
                        <TouchableOpacity onPress={() => navigation.navigate('UserTerms')}>
                            <Small theme="light">user terms</Small>
                        </TouchableOpacity>
                    </View>
                </View>
                <Br space={0.03} />
                <Button loading={loading} style={{width: width * 0.85}} onPress={onSignup}>Create an Account</Button>
                <Br space={0.03} />
            </View>
        </Background>
    );
};

export default Signup;
