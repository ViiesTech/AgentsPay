/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Swiper from 'react-native-swiper';
import SubscriptionCard from '../components/SubscriptionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, baseUrl, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const Subscriptions = ({ navigation }) => {
    const [subscriptions, setSubscriptions] = useState();
    const [token, setToken] = useState('')
    useEffect(() => {
        subscribe()
        loadSubscriptions();
    }, []);

    const subscribe = async () => {
        const isToken = await AsyncStorage.getItem('token');
        setToken(isToken);
    };

    const loadSubscriptions = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/subscriptions/all', { headers: { Authorization: `Bearer ${token}` } });

            setSubscriptions(res.data?.data);
        } catch (err) {
            await errHandler(err, () => loadSubscriptions());
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
            </View>
            <Br space={0.05} />
            <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Subscriptions</H5>
            <Br space={0.02} />
            {
                subscriptions.length === 0
                    ?
                    <Pera style={{ textAlign: 'center' }}>No Subscription Available</Pera>
                    :
                    subscriptions.length === 1
                        ?
                        <View style={{ height: height < 650 ? (height * 0.4) : (height * 0.33) }}>
                            <SubscriptionCard data={subscriptions[0]} onPress={() => Linking.openURL(`https://agentpayapp.com/payment?id=${subscriptions[0]?.subscription_id}&&token=${token}`)} style={{ width: width * 0.85, alignSelf: 'center' }} />
                                {/* navigation.navigate('SubscriptionPayment', { package: subscriptions[0] }) */}
                        </View>
                        :
                        <View style={{ zIndex: 1 }}>

                            {
                                subscriptions.map((val, index) => {
                                    return (
                                        <View key={index} style={{ marginBottom:width*0.05, zIndex: 10,  }}>
                                            <SubscriptionCard data={val} onPress={() => navigation.navigate('SubscriptionPayment', { package: val })} style={{ width: width * 0.85, alignSelf: 'center' }} />
                                        </View>
                                    );
                                })
                            }
                        </View>
            }
        </Background>
    );
};

export default Subscriptions;
