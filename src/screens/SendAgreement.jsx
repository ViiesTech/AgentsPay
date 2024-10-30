/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import Toast from 'react-native-simple-toast';
import Backbtn from '../components/Backbtn';
import { api, errHandler } from '../API';
import { ShowAlert } from '../utils/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const SendAgreement = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        subject: '',
        email: '',
        recipient_name: '',
    });

    const isValid = () => {
        if (validator.isEmpty(user?.subject)) {
            ShowAlert('Subject is required!', 'Please enter subject.');
            return false;
        }
        if (validator.isEmpty(user?.email)) {
            ShowAlert('Email is required!', 'Please enter email.');
            return false;
        }
        if (!validator.isEmail(user?.email)) {
            ShowAlert('Email is not valid!', 'Please enter valid email address.');
            return false;
        }
        if (validator.isEmpty(user?.recipient_name)) {
            ShowAlert('Recipient name is required!', 'Please enter recipient name.');
            return false;
        }

        return true;
    };
    const onSendAgreement = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await api.post('/agreement/send', {
                    id: route?.params?.id,
                    subject: user?.subject,
                    email: user?.email,
                    recipient_name: user?.recipient_name,
                }, { headers: { Authorization: `Bearer ${token}` } });

                Toast.show(res.data?.title, Toast.SHORT);
                navigation.replace('Home');
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
                <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold', textAlign: 'center'}}>Send Agreement</H5>
                <Br space={0.05} />
                <Input
                    defaultValue={route?.params?.email}
                    value={user?.subject}
                    labelText="Subject"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, subject: value})}
                />
                <Input
                    defaultValue={route?.params?.email}
                    value={user?.email}
                    labelText="Email"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, email: value?.toLowerCase()})}
                />
                <Input
                    defaultValue={route?.params?.email}
                    value={user?.recipient_name}
                    labelText="Recipient Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({...user, recipient_name: value})}
                />
                <Br space={0.03} />
                <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={onSendAgreement}>Send</ButtonOutline>
                <Br space={0.02} />
            </View>
        </Background>
    );
};

export default SendAgreement;
