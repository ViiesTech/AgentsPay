/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Button } from '../components/Button';
import { Color } from '../utils/Colors';

const { width, height } = Dimensions.get('window');
const PaymentCards = ({ navigation }) => {
    return (
        <>
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
                <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Payment Cards</H5>
                <Br space={0.03} />
                <ImageBackground source={require('../assets/images/credit_card.png')} resizeMode="contain" style={{ width: width * 0.85, height: height * 0.3, alignSelf: 'center', justifyContent: 'flex-end' }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: height < 650 ? -(height * 0.015) : (height * 0.01),
                        left: width * 0.04,
                        width: width * 0.76,
                    }}>
                        <Small theme="transparent" style={{fontFamily: 'Poppins-SemiBold'}}>Selected</Small>
                        <Small style={{color: Color('danger'), fontFamily: 'Poppins-SemiBold'}}>Remove</Small>
                    </View>
                    <View style={{ marginBottom: height < 650 ? (height * 0.04) : (height * 0.06), marginLeft: width * 0.06 }}>
                        <Pera style={{ fontFamily: 'IBMPlexMono-Regular' }}>Alvert Flore</Pera>
                        <Pera style={{ fontFamily: 'IBMPlexMono-Regular' }}>0156 - 6198 - 5191 - 6519</Pera>
                    </View>
                </ImageBackground>
                <Br space={0.08} />
            </Background>
            <Button onPress={() => navigation.navigate('AddCard')} style={{ width: width * 0.85, alignSelf: 'center', position: 'absolute', bottom: height * 0.05 }}>Add New Card</Button>
        </>
    );
};

export default PaymentCards;
