/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Button } from '../components/Button';
import { Color } from '../utils/Colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import Loading from './Loading';
import Toast from 'react-native-simple-toast';
import { encryption } from '../utils/defaultValues';

const { width, height } = Dimensions.get('window');
const PaymentCards = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [ paymentCards, setPaymentCards ] = useState();
    const [ key, setKey ] = useState('');

    useEffect(() => {
        if (isFocused) {loadCards();}
    }, [isFocused]);

    const loadCards = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/payment/cards', {headers: {Authorization: `Bearer ${token}`}});
            setKey(token);
            setPaymentCards(res.data?.data);
        } catch(err) {
            await errHandler(err);
        }
    };

    const activateCard = async (selected, id) => {
        try {
            if (selected === 1) {
                return false;
            }

            const token = await AsyncStorage.getItem('token');
            const res = await api.put('/user/payment/activate_card',{id: id}, {headers: {Authorization: `Bearer ${token}`}});
            Toast.show(res.data?.title, Toast.SHORT);
            loadCards();
        } catch(err) {
            await errHandler(err);
        }
    };

    const removeCard = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.delete('/user/payment/remove_card?id=' + id, {headers: {Authorization: `Bearer ${token}`}});
            Toast.show(res.data?.title, Toast.SHORT);
            loadCards();
        } catch(err) {
            await errHandler(err);
        }
    };

    function splitTextByFour(text) {
        return text.match(/.{1,4}/g);
    }

    if (!paymentCards) {
        return <Loading />;
    }

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
                {
                    paymentCards.map(
                        (val, index) => {
                            const card_owner_name = encryption(val?.card_owner_name, key);
                            const card_number = encryption(val?.card_number, key);

                            const card_number_format = splitTextByFour(card_number);

                            return (
                                <Pressable key={index} onPress={() => activateCard(val.selected, val.id)}>
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
                                            <Small theme="transparent" style={{fontFamily: 'Poppins-SemiBold'}}>{val.selected === 1 && 'Selected'}</Small>
                                            {
                                                val.selected === 0 && (
                                                    <Pressable onPress={() => removeCard(val.id)}>
                                                        <Small style={{color: Color('danger'), fontFamily: 'Poppins-SemiBold'}}>Remove</Small>
                                                    </Pressable>
                                                )
                                            }
                                        </View>
                                        <View style={{ marginBottom: height < 650 ? (height * 0.04) : (height * 0.06), marginLeft: width * 0.06 }}>
                                            <Pera style={{ fontFamily: 'IBMPlexMono-Regular', textTransform: 'capitalize' }}>{card_owner_name}</Pera>
                                            <Pera style={{ fontFamily: 'IBMPlexMono-Regular' }}>{card_number_format.join(' - ')}</Pera>
                                        </View>
                                    </ImageBackground>
                                </Pressable>
                            );
                        }
                    )
                }
                <Br space={0.08} />
            </Background>
            <Button onPress={() => navigation.navigate('AddCard')} style={{ width: width * 0.85, alignSelf: 'center', position: 'absolute', bottom: height * 0.05 }}>Add New Card</Button>
        </>
    );
};

export default PaymentCards;
