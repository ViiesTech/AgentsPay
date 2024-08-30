/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5, H6, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Input from '../components/Input';
import { Button } from '../components/Button';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');
const SubscriptionPayment = ({ navigation }) => {
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
            <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Payment</H5>
            <Br space={0.02} />
            <View style={{ alignSelf: 'center', position: 'relative', borderRadius: height < 650 ? 20 : 30, width: width * 0.75, padding: width * 0.04, paddingTop: height * 0.03, borderWidth: 3, borderColor: Color('btnBackground') }}>
                <H6 style={{ fontStyle: 'italic' }}>Package 1</H6>
                <Br space={0.02} />
                <Small>
                    Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
                </Small>
                <ImageBackground style={{ paddingVertical: height * 0.005, width: height < 650 ? (width * 0.25) : (width * 0.3), alignItems: 'center', position: 'absolute', top: width * 0.055, right: 0 }} source={require('../assets/images/subs_price_bg.png')} resizeMode="stretch">
                    <Pera style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>$9.99</Pera>
                </ImageBackground>
            </View>
            <Br space={0.03} />
            <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                <Input
                    labelText="Card Number"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Input
                    labelText="Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input
                        labelText="Expiry"
                        style={{ marginBottom: height * 0.015, width: width * 0.35 }}
                        onChange={(emailAddress) => console.log(emailAddress)}
                    />
                    <Input
                        labelText="CVV"
                        style={{ marginBottom: height * 0.015, width: width * 0.35 }}
                        onChange={(emailAddress) => console.log(emailAddress)}
                    />
                </View>
                <Br space={0.05} />
                <Button style={{ width: width * 0.85 }} onPress={() =>
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Payment Successful',
                        textBody: "You've successfuly subscribed to our package, welcome to our mobile app.",
                        button: 'Thanks',
                        onPressButton: () => navigation.navigate('Home'),
                    })
                }>Pay Now</Button>
            </View>
        </Background>
    );
};

export default SubscriptionPayment;
