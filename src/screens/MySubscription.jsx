/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import SubscriptionCard from '../components/SubscriptionCard';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');
const MySubscription = ({ navigation }) => {
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
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Subscribed Plan</H5>
            <Br space={0.02} />
            <SubscriptionCard onPress={() => navigation.navigate('SubscriptionPayment')} style={{ width: width * 0.85, alignSelf: 'center' }} />
            <Br space={0.05} />
            <Button onPress={() => console.log('1')} style={{ width: width * 0.85, alignSelf: 'center' }}>Upgrade Plan</Button>
        </Background>
    );
};

export default MySubscription;
