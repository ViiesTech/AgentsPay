/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, View } from 'react-native';
import Background from '../utils/Background';
import Backbtn from '../components/Backbtn';
import { H5, H6, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Color } from '../utils/Colors';

const { width } = Dimensions.get('window');
const Notifications = ({ navigation }) => {
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
            <H5 theme="light" style={{fontFamily: 'Poppins-Medium', textAlign: 'center'}}>Notifications</H5>
            <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter your new password to reset password</Pera>
            <Br space={0.02} />
            <View style={{backgroundColor: Color('btnBackground'), padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.02} />
            <View style={{borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 theme="light" style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.02} />
            <View style={{borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 theme="light" style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.02} />
            <View style={{borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 theme="light" style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.02} />
            <View style={{borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 theme="light" style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.02} />
            <View style={{borderColor: Color('btnBackground'), borderWidth: 1, padding: width * 0.03, width: width * 0.85, borderRadius: 5, alignSelf: 'center'}}>
                <H6 theme="light" style={{fontFamily: 'Poppins-Medium'}}>NEW UPDATES</H6>
                <Pera>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore....
                </Pera>
                <Br space={0.01} />
                <Small>
                    5h ago
                </Small>
            </View>
            <Br space={0.08} />
        </Background>
    );
};

export default Notifications;
