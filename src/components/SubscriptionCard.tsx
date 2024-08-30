/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Color } from '../utils/Colors';
import { H5, H6, Pera } from '../utils/Text';
import Br from './Br';

const { width } = Dimensions.get('window');

const SubscriptionCard = ({ style, onPress }: { style?: any, onPress?: any }) => {
    const onClicked = () => {
        if (onPress) {onPress();}
    };
    return (
        <TouchableOpacity onPress={onClicked} style={[{ padding: width * 0.05, backgroundColor: Color('textColor'), borderRadius: 10 }, style]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Image source={require('../assets/images/subscription_logo.png')} style={{width: width * 0.2, height: width * 0.2}} resizeMode="contain" />
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <H5 style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium'}}>$9.99</H5>
                    <H6 style={{color: Color('btnText'), fontStyle: 'italic'}}>/month</H6>
                </View>
            </View>
            <Br space={0.02} />
            <H6 style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium'}}>Package 1</H6>
            <Pera style={{ color: Color('gray') }}>Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit</Pera>
        </TouchableOpacity>
    );
};

export default SubscriptionCard;
