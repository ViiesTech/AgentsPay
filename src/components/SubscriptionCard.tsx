/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Color } from '../utils/Colors';
import { H5, H6, Pera } from '../utils/Text';
import Br from './Br';

const { width } = Dimensions.get('window');

const SubscriptionCard = ({ data, style, onPress }: { data?: any, style?: any, onPress?: any }) => {
    const { amount, description, duration, icon, title } = data;
    const onClicked = () => {
        if (onPress) {onPress();}
    };
    return (
        <Pressable onPress={onClicked} style={[{ padding: width * 0.05, backgroundColor: Color('textColor'), borderRadius: 10, zIndex: 1 }, style]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Image source={{uri: icon}} style={{width: width * 0.2, height: width * 0.2}} resizeMode="contain" />
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <H5 style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium'}}>${parseFloat(amount).toFixed(2)}</H5>
                    <H6 style={{color: Color('btnText'), fontStyle: 'italic'}}>/{duration}</H6>
                </View>
            </View>
            <Br space={0.02} />
            <H6 numberOfLines={1} style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium'}}>{title}</H6>
            <Pera style={{ color: Color('gray') }}>{description}</Pera>
        </Pressable>
    );
};

export default SubscriptionCard;
