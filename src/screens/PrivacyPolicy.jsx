/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import Br from '../components/Br';
import Backbtn from '../components/Backbtn';
import Hr from '../components/Hr';

const { width, height } = Dimensions.get('window');
const PrivacyPolicy = ({ navigation }) => {
    const policyText = 'Aldus Corporation, which later merged with Adobe Systems, ushered lorem information age with its desktop publishing software Aldus PageMaker. The program came bundled with lorem ipsum dummy text for laying out page content, and other word processors like Microsoft Word followed suit. More recently the growth of web design has proliferate lorem ipsum across the internet as a placeholder for future text and in some cases the final content this is why we proofread, kids.<br />Aldus Corporation, which later merged with Adobe Systems, ushered lorem information age with its desktop publishing software Aldus PageMaker.<br />The program came bundled with lorem ipsum dummy text for laying out page content, and other word processors like Microsoft Word followed suit. More recently the growth of web design has proliferate lorem ipsum across the internet as a placeholder for future text and in some cases the final content this is why we proofread, kids. Aldus Corporation, which later merged with Adobe Systems, ushered lorem information age with its desktop publishing software Aldus PageMaker.<br />The program came bundled with lorem ipsum dummy text for laying out page content, and other word processors like Microsoft Word followed suit. More recently the growth of web design has proliferate lorem ipsum across the internet as a placeholder for future text and in some cases the final content this is why we proofread, kids.';
    return (
        <Background>
            <Backbtn onPress={() => navigation.goBack()} />
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Image source={require('../assets/images/icon.png')} style={{ alignSelf: 'center', width: width * 0.4, height: width * 0.4, resizeMode: 'contain', marginTop: height * 0.05 }} />
                <Br space={0.01} />
                <View style={{width: width * 0.85, alignItems: 'center'}}>
                    <H5 theme="light" style={{fontFamily: 'Poppins-SemiBold'}}>Privacy Policy</H5>
                    <Pera theme="transparent" style={{textAlign: 'center'}}>Please enter your new password to reset password</Pera>
                    <Br space={0.01} />
                    <Hr style={{ width: width * 0.5 }} />
                    <Br space={0.02} />
                    <Pera style={{textAlign: 'left'}}>{policyText.replaceAll('<br />', '\n\n')}</Pera>
                    <Br space={0.05} />
                </View>
            </View>
        </Background>
    );
};

export default PrivacyPolicy;
