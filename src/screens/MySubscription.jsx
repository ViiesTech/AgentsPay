/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import SubscriptionCard from '../components/SubscriptionCard';
import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../redux/Reducers/drawerSlice';

const { width } = Dimensions.get('window');
const MySubscription = ({ navigation }) => {
    const [ subscription, setSubscription ] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        loadSubscription();
    }, []);

    const loadSubscription = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/subscriptions/current',{headers: {Authorization: `Bearer ${token}`}});

            setSubscription(res.data?.data);
        } catch(err) {
            await errHandler(err, () => loadSubscription());
        }
    };

    if (!subscription) {
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
                    navigation.goBack()}} />
            </View>
            <Br space={0.05} />
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Subscribed Plan</H5>
            <Br space={0.02} />
            <SubscriptionCard data={subscription} onPress={() => console.log('do nothing')} style={{ width: width * 0.85, alignSelf: 'center' }} />
            <Br space={0.05} />
            <Button onPress={() => navigation.navigate('Subscriptions')} style={{ width: width * 0.85, alignSelf: 'center' }}>Upgrade Plan</Button>
        </Background>
    );
};

export default MySubscription;
