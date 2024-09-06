/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import Backbtn from '../components/Backbtn';
import Hr from '../components/Hr';
import Toast from 'react-native-simple-toast';
import { api, errHandler } from '../API';

const { width, height } = Dimensions.get('window');
const ForgotPassword = ({ navigation }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [ user, setUser ] = useState({
        input: '',
    });

    const isValid = () => {
        if (validator.isEmpty(user?.input)) {
            Alert.alert('Email/Phone Number is required!', 'Please enter your email or phone number.');
            return false;
        }
        if (!validator.isEmail(user?.input) && !validator.isMobilePhone(user?.input, ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-PS', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'az-LB', 'az-LY', 'be-BY', 'bg-BG', 'bn-BD', 'bs-BA', 'ca-AD', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LU', 'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AU', 'en-BM', 'en-BS', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 'en-HK', 'en-IE', 'en-IN', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-LS', 'en-MO', 'en-MT', 'en-MU', 'en-MW', 'en-NG', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-SS', 'en-TZ', 'en-UG', 'en-US', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EC', 'es-ES', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-AF', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BJ', 'fr-CD', 'fr-CF', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF', 'fr-RE', 'fr-WF', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'ir-IR', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'ko-KR', 'ky-KG', 'lt-LT', 'mg-MG', 'mn-MN', 'ms-MY', 'my-MM', 'mz-MZ', 'nb-NO', 'ne-NP', 'nl-AW', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-AO', 'pt-BR', 'pt-PT', 'ro-Md', 'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'so-SO', 'sq-AL', 'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-UZ', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'])) {
            Alert.alert('Email/Phone Number is not valid!', 'Please enter your valid email address or phone number.');
            return false;
        }

        return true;
    };
    const sendOtp = async () => {
        const validation = isValid();
        if (validation) {
            setLoading(true);

            try {
                const res = await api.get('/auth/forgot_password?input=' + user?.input);
                Toast.show(res.data?.title, Toast.SHORT);
                const request_id = res.data.data.request_id;
                navigation.navigate('OTP', {request_id: request_id});
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
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Forgot Password</H5>
                    <Pera theme="transparent">Please enter your email to reset password</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.03} />
                    <Input
                        value={user?.input}
                        labelText="Email/Phone number"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(value) => setUser({...user, input: value})}
                    />
                    <Br space={0.04} />
                    <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={sendOtp}>Submit</ButtonOutline>
                </View>
            </View>
        </Background>
    );
};

export default ForgotPassword;
