/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, H6, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import moment from 'moment-timezone';

const { width } = Dimensions.get('window');
const Notifications = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [ notifications, setNotifications ] = useState();

    useEffect(() => {
        if (isFocused) {loadNotifications();}
    }, [isFocused]);

    const loadNotifications = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/notifications', {headers: {Authorization: `Bearer ${token}`}});
            setNotifications(res.data?.data);
        } catch(err) {
            await errHandler(err);
        }
    };
    const Notification = ({ data, id }) => {
        const activeStyle = {backgroundColor: Color('btnBackground'), padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'};
        const inactiveStyle = {borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'};

        const startTime = moment(data?.createdAt);
        const endTime = moment();
        const duration = moment.duration(endTime.diff(startTime));
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        const dt = minutes <= 60 ? `${minutes}m` : hours <= 24 ? `${hours}h` : days <= 30 ? `${days}d` : `${months}m`;

        return (
            <React.Fragment key={id}>
                <View style={id === 0 ? activeStyle : inactiveStyle }>
                    <H6 theme={ id === 0 ? null : 'light' } style={{fontFamily: 'Poppins-Medium', textTransform: 'uppercase'}}>{data?.title}</H6>
                    <Pera>
                        {data?.body}
                    </Pera>
                    <Br space={0.01} />
                    <Small>
                        {dt.toString().split('-').pop()} ago
                    </Small>
                </View>
                <Br space={0.02} />
            </React.Fragment>
        );
    };

    if (!notifications) {
        return <Loading />;
    }

    return (
        <Background>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.85,
                alignSelf: 'center',
            }}>
                <Backbtn position="static" onPress={() => navigation.goBack()} />
            </View>
            <Br space={0.05} />
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Notifications</H5>
            <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter your new password to reset password</Pera>
            <Br space={0.02} />
            {
                notifications.length === 0
                ?
                <Pera style={{textAlign: 'center'}}>No Notification</Pera>
                :
                notifications.map((val, index) => {
                    return <Notification id={index} data={val} />;
                })
            }
            <Br space={0.08} />
        </Background>
    );
};

export default Notifications;
