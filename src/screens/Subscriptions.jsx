/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import Purchases from 'react-native-purchases';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Platform, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Br from '../components/Br';
import { H5, Pera } from '../utils/Text';
import SubscriptionCard from '../components/SubscriptionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const SubscriptionScreen = ({ navigation, route }) => {
    const [ currentSubscription, setCurrentSubscription ] = useState();
    const [ subscriptions, setSubscriptions ] = useState();
    const [ subscriptionList, setSubscriptionList ] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                setCurrentSubscription(offerings.current?.availablePackages[0]);
                setSubscriptions(offerings.all?.Default);
                setSubscriptionList(Object.keys(offerings.all?.Default));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (Platform.OS === 'ios') {
            fetchProducts();
        }else {
            loadSubscriptions();
        }
    }, []);

    const loadSubscriptions = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/subscriptions/all', { headers: { Authorization: `Bearer ${token}` } });

            setSubscriptions(res.data?.data);
        } catch (err) {
            await errHandler(err, () => loadSubscriptions());
        }
    };

    const handlePurchase = async (selectedPackage, price) => {
        try {
            if (selectedPackage?.identifier !== currentSubscription?.identifier) {
                const purchaseInfo = await Purchases.purchasePackage(selectedPackage);
                subscribe(purchaseInfo?.transaction, moment(purchaseInfo?.customerInfo?.allExpirationDates).format('YYYY-MM-DD'), price);
            }
        } catch (error) {
            if (error.userCancelled) {
                console.log('User  cancelled the purchase');
            } else {
                console.log('Error purchasing package:', error);
                // Handle other errors (e.g., show error message)
            }
        }
    };

    const subscribe = async (transaction, expiry, price) => {
        // PAYMENT METHOD IS NOT DEFINED
        // ASKED MR. ALI 2024-09-09
        const validation = true; //isValid();

        if (validation) {
            try {
                Toast.show('Please Wait...', Toast.SHORT);
                const token = await AsyncStorage.getItem('token');
                const res = await api.post('/user/subscriptions/buy', {
                    transaction: JSON.stringify(transaction),
                    expiry: expiry,
                    price: price,
                }, { headers: { Authorization: `Bearer ${token}` } });

                if (route.name === 'Subscriptions') {
                    if (Platform.OS === 'android') {
                        Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            gravity: 'center',
                            title: res.data?.title,
                            textBody: res.data?.message,
                            button: 'Great',
                            onPressButton: () => {
                                navigation.replace('Home');
                                Dialog.hide();
                            },
                            onHide: () => {
                                navigation.replace('Home');
                                Dialog.hide();
                            },
                        });
                    }else {
                        Alert.alert(
                            res.data?.title,
                            res.data?.message, [
                                {text: 'Great', onPress: () => navigation.replace('Home')},
                            ]
                        );
                    }
                }
            } catch (err) {
                await errHandler(err);
            }
        }
    };

    if (Platform.OS === 'android') {
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
                                <SubscriptionCard data={subscriptions[0]} onPress={() => navigation.navigate('SubscriptionPayment', { package: subscriptions[0] })} style={{ width: width * 0.85, alignSelf: 'center' }} />
                            </View>
                            :
                            <View style={{ zIndex: 1 }}>

                                {
                                    subscriptions.map((val, index) => {
                                        return (
                                            <View key={index} style={{ marginBottom: width * 0.05, zIndex: 10 }}>
                                                <SubscriptionCard data={val} onPress={() => navigation.navigate('SubscriptionPayment', { package: val })} style={{ width: width * 0.85, alignSelf: 'center' }} />
                                            </View>
                                        );
                                    })
                                }
                            </View>
                }
            </Background>
        );
    }else {
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
                    {
                        !subscriptionList
                        ?
                        <Pera style={{ textAlign: 'center' }}>No Subscription Available</Pera>
                        :
                        subscriptionList.length === 0
                        ?
                        <Pera style={{ textAlign: 'center' }}>No Subscription Available</Pera>
                        :
                        <View style={{ zIndex: 1 }}>
                            <View style={{ marginBottom: width * 0.05, zIndex: 10 }}>
                                <SubscriptionCard selectedPackage={subscriptions?.availablePackages?.filter(val => val?.identifier === subscriptions.monthly?.identifier)[0]} identifier={subscriptions.monthly?.identifier} data={subscriptions.monthly} onPress={(value, price) => handlePurchase(value, price)} style={{ width: width * 0.85, alignSelf: 'center' }} />
                            </View>
                            <View style={{ marginBottom: width * 0.05, zIndex: 10 }}>
                                <SubscriptionCard selectedPackage={subscriptions?.availablePackages?.filter(val => val?.identifier === subscriptions.annual?.identifier)[0]} identifier={subscriptions.annual?.identifier} data={subscriptions.annual} onPress={(value, price) => handlePurchase(value, price)} style={{ width: width * 0.85, alignSelf: 'center' }} />
                            </View>
                        </View>
                    }
                </View>
            </Background>
        );
    }
};

export default SubscriptionScreen;
