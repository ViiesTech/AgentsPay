/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Swiper from 'react-native-swiper';
import SubscriptionCard from '../components/SubscriptionCard';

const { width, height } = Dimensions.get('window');
const Subscriptions = ({ navigation }) => {
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
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Subscription</H5>
            <Br space={0.02} />
            <Swiper
                centerContent
                showsButtons={false}
                style={{ height: height < 650 ? (height * 0.4) :  (height * 0.33) }}
                showsPagination={true}
                activeDotColor={Color('btnBackground')}
                loop
            >
                <SubscriptionCard onPress={() => navigation.navigate('SubscriptionPayment')} style={{ width: width * 0.85, alignSelf: 'center' }} />
                <SubscriptionCard onPress={() => navigation.navigate('SubscriptionPayment')} style={{ width: width * 0.85, alignSelf: 'center' }} />
                <SubscriptionCard onPress={() => navigation.navigate('SubscriptionPayment')} style={{ width: width * 0.85, alignSelf: 'center' }} />
            </Swiper>
        </Background>
    );
};

export default Subscriptions;
