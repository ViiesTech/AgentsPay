/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Swiper from 'react-native-swiper';
import SubscriptionCard from '../components/SubscriptionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const Subscriptions = ({ navigation }) => {
    const [ subscriptions, setSubscriptions ] = useState();
    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/subscriptions/all',{headers: {Authorization: `Bearer ${token}`}});

            setSubscriptions(res.data?.data);
        } catch(err) {
            await errHandler(err);
        }
    };

    if (!subscriptions) {
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
                <Notificationbtn unSeen position="static" onPress={() => navigation.goBack()} />
            </View>
            <Br space={0.05} />
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Subscriptions</H5>
            <Br space={0.02} />
            <Swiper
                centerContent
                showsButtons={false}
                style={{ height: height < 650 ? (height * 0.4) :  (height * 0.33) }}
                showsPagination={true}
                activeDotColor={Color('btnBackground')}
                loop
            >
                {
                    subscriptions.map((val, index) => {
                        return (
                            <View key={index}>
                                <SubscriptionCard data={val} onPress={() => navigation.navigate('SubscriptionPayment', {package: val})} style={{ width: width * 0.85, alignSelf: 'center' }} />
                            </View>
                        );
                    })
                }
            </Swiper>
        </Background>
    );
};

export default Subscriptions;
