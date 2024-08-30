/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5 } from '../utils/Text';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';

const { width, height } = Dimensions.get('window');
const AddCard = ({ navigation }) => {
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
                </View>
                <Br space={0.08} />
            </Background>
            <ButtonOutline onPress={() => console.log('1')} style={{ width: width * 0.85, alignSelf: 'center', position: 'absolute', bottom: height * 0.05 }}>Add Card</ButtonOutline>
        </>
    );
};

export default AddCard;
