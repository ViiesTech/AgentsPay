/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H1, H5, Pera, Small } from '../utils/Text';
import Br from '../components/Br';
import { Button } from '../components/Button';
import { Color } from '../utils/Colors';
import { AvatarList } from '../components/GroupAvatar';

const { width, height } = Dimensions.get('window');
const Welcome = ({ navigation }) => {
    return (
        <Background noAuth>
            <View style={{paddingTop: height * 0.05, height: height * 0.9, width: width * 0.8, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ width: width * 0.2, height: width * 0.2, resizeMode: 'contain', alignSelf: 'center' }} />
                <Br space={0.04} />
                <H5 style={{fontFamily: 'Poppins-SemiBold', transform: [{translateY: height * 0.025}]}}>Welcome to</H5>
                <H1 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Agent Pay</H1>
                <Br space={0.03} />
                <View style={{borderColor: Color('textColor'), borderLeftWidth: 1, paddingVertical: height * 0.01, paddingLeft: width * 0.05}}>
                    <Small>
                        Welcome To Agent Pay
                    </Small>
                    <Br space={0.02} />
                    <View style={{flexDirection: 'row', gap: 30, alignItems: 'center'}}>
                        <AvatarList width={40} height={40} arr={['https://random.imagecdn.app/500/150', 'https://random.imagecdn.app/500/150', 'https://random.imagecdn.app/500/150']} />
                        <Small theme="transparent" style={{marginTop: height * 0.005}}>500+ more</Small>
                    </View>
                </View>
                <Br space={0.05} />
                <Button style={{width: width * 0.8}} onPress={() => navigation.navigate('Signup')}>Create an Account</Button>
                <Br space={0.02} />
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 5}}>
                    <Pera theme="transparent">Already have an Account?</Pera>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Pera theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Sign in</Pera>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    );
};

export default Welcome;
