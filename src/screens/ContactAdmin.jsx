/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import Notificationbtn from '../components/Notificationbtn';
import { H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import Input from '../components/Input';
import { Color } from '../utils/Colors';
import { ButtonOutline } from '../components/Button';

const { width, height } = Dimensions.get('window');
const ContactAdmin = ({ navigation }) => {
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
            <View style={{ width: width * 0.85, alignSelf: 'center' }}>
                <Br space={0.08} />
                <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Contact Admin</H5>
                <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter below details to complete your profile</Pera>
                <Br space={0.02} />
                <Input
                    labelText="Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Input
                    labelText="Email"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(emailAddress) => console.log(emailAddress)}
                />
                <Br space={0.02} />
                <Small theme="transparent" style={{paddingLeft: width * 0.02}}>Message</Small>
                <Br space={0.01} />
                <View style={{
                    padding: width * 0.05,
                    paddingTop: height * 0.01,
                    backgroundColor: Color('btnOutline'),
                    borderRadius: 20,
                }}>
                    <TextInput placeholder="Enter Your Message Here" numberOfLines={height < 650 ? 8 : 10} style={{textAlignVertical: 'top'}} placeholderTextColor={Color('gray')} />
                </View>
                <Br space={0.05} />
                <ButtonOutline>
                    Submit
                </ButtonOutline>
            </View>
        </Background>
    );
};

export default ContactAdmin;
