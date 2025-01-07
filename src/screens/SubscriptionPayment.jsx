/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, H6, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';
import Input from '../components/Input';
import { Button } from '../components/Button';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, baseUrl, errHandler } from '../API';
import { WebView } from 'react-native-webview';
import Loading from './Loading';

const { width, height } = Dimensions.get('window');
const SubscriptionPayment = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');


    const subscribe = async () => {
        const isToken = await AsyncStorage.getItem('token');
        setToken(isToken);
    };

    useEffect(() => {
        subscribe();
    }, []);

    const handleNavigationStateChange = (navState) => {
        // setUrl(navState.url);
        // Do something with the new URL
        // console.log('New URL:', navState.url);
        // navigation.replace('Home');
        if (route.name === 'SubscriptionPayment' && navState?.url?.includes('success')) {
            navigation.replace('Home');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {!token ?
                <Background>
                    <Loading />
                </Background>
                :
                <WebView
                    onNavigationStateChange={handleNavigationStateChange}
                    scalesPageToFit={true}
                    source={{ uri: `https://agentpayapp.com/payment?id=${route?.params?.package?.subscription_id}&&token=${token}` }}

                />
            }
        </View>

        // <Background>
        //     <View style={{
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         justifyContent: 'space-between',
        //         width: width * 0.85,
        //         alignSelf: 'center',
        //     }}>
        //         <Backbtn position="static" onPress={() => navigation.goBack()} />
        //     </View>
        //     <Br space={0.05} />
        //     <H5 theme="light" style={{ fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Payment</H5>
        //     <Br space={0.02} />
        //     <View style={{ alignSelf: 'center', position: 'relative', borderRadius: height < 650 ? 20 : 30, width: width * 0.75, padding: width * 0.04, paddingTop: height * 0.03, borderWidth: 3, borderColor: Color('btnBackground') }}>
        //         <H6 style={{ fontStyle: 'italic' }}>{route?.params?.package?.title}</H6>
        //         <Br space={0.02} />
        //         <Small>
        //             {route?.params?.package?.description}
        //         </Small>
        //         <ImageBackground style={{ paddingVertical: height * 0.005, width: height < 650 ? (width * 0.25) : (width * 0.3), alignItems: 'center', position: 'absolute', top: width * 0.055, right: 0 }} source={require('../assets/images/subs_price_bg.png')} resizeMode="stretch">
        //             <Pera style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>${parseFloat(route?.params?.package?.amount).toFixed(2)}</Pera>
        //         </ImageBackground>
        //     </View>
        //     <Br space={0.03} />
        //     <View style={{ width: width * 0.85, alignSelf: 'center' }}>
        //         <Input
        //             value={currentPackage?.card_number}
        //             labelText="Card Number"
        //             style={{ marginBottom: height * 0.015 }}
        //             onChange={(value) => setCurrentPackage({...currentPackage, card_number: value})}
        //             keyboardType="numeric"
        //         />
        //         <Input
        //             value={currentPackage?.owner_name}
        //             labelText="Name"
        //             style={{ marginBottom: height * 0.015 }}
        //             onChange={(value) => setCurrentPackage({...currentPackage, owner_name: value})}
        //         />

        //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        //             <Input
        //                 value={currentPackage?.expiry}
        //                 labelText="Expiry"
        //                 style={{ marginBottom: height * 0.015, width: width * 0.35 }}
        //                 onChange={(value) => saveExpiry(value)}
        //             />
        //             <Input
        //                 value={currentPackage?.cvv}
        //                 labelText="CVV"
        //                 style={{ marginBottom: height * 0.015, width: width * 0.35 }}
        //                 onChange={(value) => setCurrentPackage({...currentPackage, cvv: value})}
        //                 keyboardType="numeric"
        //             />
        //         </View>
        //         <Br space={0.05} />
        //         <Button loading={loading} style={{ width: width * 0.85 }} onPress={subscribe}>Pay Now</Button>
        //     </View>
        // </Background>
    );
};

export default SubscriptionPayment;
