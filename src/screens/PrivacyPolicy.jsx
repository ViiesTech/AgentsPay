/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import Backbtn from '../components/Backbtn';
import Hr from '../components/Hr';
import { useIsFocused } from '@react-navigation/native';
import { api, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const PrivacyPolicy = ({ navigation, route }) => {
    const isFocused = useIsFocused();

    const [ content, setContent ] = useState('');

    useEffect(() => {
        if (isFocused) {loadContent();}
    }, [isFocused]);

    const loadContent = async () => {
        try {
            const res = await api.get('/user/privacy_policy');
            const data = res.data?.data?.content || 'No Privacy Policy';
            setContent(data);
        } catch(err) {
            await errHandler(err, () => loadContent());
        }
    };

    if (content.length === 0) {
        return <Loading noAuth />;
    }

    return (
        <Background noAuth>
            <Backbtn onPress={() => navigation.goBack()} backToSidebar={route?.params?.backToSidebar} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.01} />
                <View style={{width: width * 0.85, alignItems: 'center'}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Privacy Policy</H5>
                    <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter your new password to reset password</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.02} />
                    <Pera style={{textAlign: 'left', whiteSpace: 'pre-line'}}>{content}</Pera>
                    <Br space={0.05} />
                </View>
            </View>
        </Background>
    );
};

export default PrivacyPolicy;
