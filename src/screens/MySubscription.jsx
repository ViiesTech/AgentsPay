/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import Purchases from 'react-native-purchases';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Br from '../components/Br';
import { H5, Pera } from '../utils/Text';
import SubscriptionCard from '../components/SubscriptionCard';
import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const MySubscription = ({ navigation, route }) => {
    const [currentSubscription, setCurrentSubscription] = useState();
    const [ subscription, setSubscription ] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (!offerings?.current) {
                    navigation.replace('Subscriptions');
                }else {
                    setCurrentSubscription(offerings.current);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (Platform.OS === 'ios') {fetchProducts();}
    }, []);
    useEffect(() => {
        if (Platform.OS === 'android') {loadSubscription();}
    }, []);

    const loadSubscription = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/subscriptions/current',{headers: {Authorization: `Bearer ${token}`}});

            if (!res.data?.data) {
                return navigation.replace('Subscriptions');
            }else {
                setSubscription(res.data?.data);
            }
        } catch(err) {
            await errHandler(err, () => loadSubscription());
        }
    };

    if (Platform.OS === 'ios') {
        return (
            <Background>
                <View style={{minHeight: height * 0.9}}>
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
                    {console.log('currentSubscription', currentSubscription)}
                    {
                        !currentSubscription
                        ?
                        <>
                            <Pera style={{ textAlign: 'center' }}>No Subscription is Active</Pera>
                            <Br space={0.05} />
                            <Button onPress={() => navigation.navigate('Subscriptions')} style={{ width: width * 0.85, alignSelf: 'center' }}>Activate Plan</Button>
                        </>
                        :
                        <View style={{ height: height < 650 ? (height * 0.4) : (height * 0.33) }}>
                            <SubscriptionCard onPress={() => console.log('clicked')} identifier={currentSubscription?.annual ? 'annual' : currentSubscription?.monthly ? 'monthly' : ''} data={currentSubscription?.monthly ? currentSubscription?.monthly : currentSubscription?.annual} style={{ width: width * 0.85, alignSelf: 'center' }} />
                            <Br space={0.05} />
                            <Button onPress={() => navigation.navigate('Subscriptions')} style={{ width: width * 0.85, alignSelf: 'center' }}>Upgrade Plan</Button>
                        </View>
                    }
                </View>
            </Background>
        );
    }else {
        if (!subscription && !currentSubscription) {
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
                    <Backbtn position="static" onPress={() => {
                        navigation.goBack();
                    }} />
                </View>
                <Br space={0.05} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Subscribed Plan</H5>
                <Br space={0.02} />
                <SubscriptionCard data={subscription} onPress={() => console.log('do nothing')} style={{ width: width * 0.85, alignSelf: 'center' }} />
                <Br space={0.05} />
                <Button onPress={() => navigation.navigate('Subscriptions')} style={{ width: width * 0.85, alignSelf: 'center' }}>Upgrade Plan</Button>
            </Background>
        );
    }

};

export default MySubscription;
