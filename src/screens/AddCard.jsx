/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, errHandler } from '../API';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { encryption, getCardType, getServiceType } from '../utils/defaultValues';

const { width, height } = Dimensions.get('window');
const AddCard = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [ card, setCard ] = useState({
        card_number: '',
        owner: '',
        expiry: '',
        cvv: '',
    });

    const saveExpiry = (date) => {
        if (date.length >= 2) {
            if (card.expiry.length < 2) {
                setCard({...card, expiry: date + '/'});
            }else {
                if (card.expiry.includes('/')) {
                    setCard({...card, expiry: date});
                }else {
                    setCard({...card, expiry: date.substring(0,2) + '/' + date.substring(2,6)});
                }
            }
        }else {
            setCard({...card, expiry: date});
        }
    };

    const isValid = () => {
        if (validator.isEmpty(card?.card_number)) {
            Alert.alert('Card Number is Required!', 'Please enter your card number.');
            return false;
        }

        if (validator.isEmpty(card?.owner)) {
            Alert.alert('Name is Required!', 'Please enter your name on card.');
            return false;
        }
        if (card?.owner?.length < 3) {
            Alert.alert('Name is not valid!', 'Name can only contains letters, minimum 3 letters are required.');
            return false;
        }

        if (validator.isEmpty(card?.expiry)) {
            Alert.alert('Card Expiry is Required!', 'Please enter your card expiry date.');
            return false;
        }

        if (validator.isEmpty(card?.cvv)) {
            Alert.alert('Card CVV is Required!', 'Please enter your card cvv.');
            return false;
        }

        return true;
    };

    const addCard = async () => {
        const token = await AsyncStorage.getItem('token');
        const validation = isValid();

        if (validation) {
            setLoading(true);

            try {
                const type = await getCardType(card?.card_number);
                const service = await getServiceType(card?.card_number);
                const res = await api.post('/user/payment/add_card', {
                    card_type: type,
                    card_service: service,
                    card_number: encryption(card?.card_number, token),
                    owner_name: encryption(card?.owner.toString(), token),
                    expiry: encryption(card?.expiry, token),
                    cvv: encryption(card?.cvv, token),
                }, {headers: {Authorization: `Bearer ${token}`}});

                if (route.name === 'AddCard') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Great',
                        onPressButton: () => navigation.navigate('PaymentCards'),
                        onHide: () => navigation.navigate('PaymentCards'),
                    });
                }
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };

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
                <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Add Cards</H5>
                <Br space={0.07} />
                <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                    <Input
                        value={card?.card_number}
                        labelText="Card Number"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(value) => setCard({...card, card_number: value})}
                    />
                    <Input
                        value={card?.owner}
                        labelText="Name"
                        style={{ marginBottom: height * 0.015 }}
                        onChange={(value) => setCard({...card, owner: value})}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input
                            value={card?.expiry}
                            labelText="Expiry"
                            style={{ marginBottom: height * 0.015, width: width * 0.35 }}
                            onChange={(value) => saveExpiry(value)}
                        />
                        <Input
                            value={card?.cvv}
                            labelText="CVV"
                            keyboardType="numeric"
                            style={{ marginBottom: height * 0.015, width: width * 0.35 }}
                            onChange={(value) => setCard({...card, cvv: value})}
                            secure
                        />
                    </View>
                </View>
                <Br space={0.08} />
            </Background>
            <ButtonOutline loading={loading} onPress={addCard} style={{ width: width * 0.85, alignSelf: 'center', position: 'absolute', bottom: height * 0.05 }}>Add Card</ButtonOutline>
        </>
    );
};

export default AddCard;
