/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import Input from '../components/Input';
import { Color } from '../utils/Colors';
import { ButtonOutline } from '../components/Button';
import { api, errHandler } from '../API';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowAlert } from '../utils/Alert';

const { width, height } = Dimensions.get('window');
const ContactAdmin = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        message: '',
    });


    useEffect(() => {
        setData();
    }, []);

    const setData =  async () => {
        const userData = await AsyncStorage.getItem('user');
        setUser({
            ...user,
            full_name: JSON.parse(userData)?.full_name,
        });
    };

    const isValid = () => {
        if (validator.isEmpty(user?.full_name)) {
            ShowAlert('Name is required!', 'Please enter your name.');
            return false;
        }
        if (!validator.isAlpha(user?.full_name.replace(' ', '')) || user?.full_name?.length < 3) {
            ShowAlert('Name is not valid!', 'Name can only contains letters, minimum 3 letters are required.');
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

        if (validator.isEmpty(user?.message)) {
            ShowAlert('Message is required!', 'Please enter your message.');
            return false;
        }

        return true;
    };

    const onContact = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await api.post('/user/contact_admin', {
                    full_name: user?.full_name,
                    email: user?.email,
                    message: user?.message,
                }, { headers: { Authorization: `Bearer ${token}` } });

                if (route.name === 'ContactAdmin') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Great',
                        onPressButton: () => navigation.replace('Home'),
                        onHide: () => navigation.replace('Home'),
                    });
                }
            } catch (err) {
                setLoading(false);
                await errHandler(err);
            }
        }
    };

    return (
        <Background>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.85,
                alignSelf: 'center',
            }}>
                <Backbtn position="static" onPress={() => {
                    navigation.goBack();
                }} />
                <Notificationbtn unSeen position="static" onPress={() => navigation.goBack()} />
            </View>
            <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                <Br space={0.08} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Contact Admin</H5>
                <Pera theme="transparent" style={{ textAlign: 'center' }}>Please enter below details to complete your profile</Pera>
                <Br space={0.02} />
                <Input
                    value={user?.full_name}
                    labelText="Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({ ...user, full_name: value })}
                    isDefaultFocused
                    readOnly
                />
                <Input
                    value={user?.email}
                    labelText="Email"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setUser({ ...user, email: value })}
                />
                <Br space={0.02} />
                <Small theme="transparent" style={{ paddingLeft: width * 0.02 }}>Message</Small>
                <Br space={0.01} />
                <View style={{
                    padding: width * 0.05,
                    paddingTop: height * 0.01,
                    backgroundColor: Color('btnOutline'),
                    borderRadius: 20,
                }}>
                    <TextInput value={user?.message} onChangeText={(value) => setUser({ ...user, message: value })} multiline placeholder="Enter Your Message Here" numberOfLines={height < 650 ? 8 : 10} style={{ textAlignVertical: 'top', color: Color('darkTheme') }} placeholderTextColor={Color('gray')} />
                </View>
                <Br space={0.05} />
                <ButtonOutline onPress={onContact} loading={loading}>
                    Submit
                </ButtonOutline>
            </View>
        </Background>
    );
};

export default ContactAdmin;
