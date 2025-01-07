/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, Platform, Pressable, View } from 'react-native';
import { Color } from '../utils/Colors';
import { H5, H6, Pera } from '../utils/Text';
import Br from './Br';

const { width } = Dimensions.get('window');

const SubscriptionCard = ({ selectedPackage, data, style, onPress }: { selectedPackage?: any, data?: any, style?: any, onPress?: any }) => {
    if (Platform.OS === 'android') {
        const { amount, description, duration, icon, title } = data;
        const onClicked = () => {
            if (onPress) { onPress(); }
        };
        return (
            <Pressable onPress={onClicked} style={[{ padding: width * 0.05, backgroundColor: Color('textColor'), borderRadius: 10, zIndex: 1 }, style]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Image source={{ uri: icon }} style={{ width: width * 0.2, height: width * 0.2 }} resizeMode="contain" />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <H5 style={{ color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium' }}>${parseFloat(amount).toFixed(2)}</H5>
                        <H6 style={{ color: Color('btnText'), fontStyle: 'italic' }}>/{duration}</H6>
                    </View>
                </View>
                <Br space={0.02} />
                <H6 numberOfLines={1} style={{ color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium' }}>{title}</H6>
                <Pera style={{ color: Color('gray') }}>{description}</Pera>
            </Pressable>
        );
    }else {
        const { packageType } = data;
        const onClicked = () => {
            if (onPress) {onPress(selectedPackage, data?.product?.price);}
        };
        return (
            <Pressable onPress={onClicked} style={[{ padding: width * 0.05, backgroundColor: Color('textColor'), borderRadius: 10, zIndex: 1 }, style]}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Pera style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-SemiBold'}}>${parseFloat(data?.product?.price).toFixed(2)}</Pera>
                    <Pera style={{color: Color('btnText'), fontStyle: 'italic'}}>/{packageType}</Pera>
                </View>
                <Br space={0.02} />
                <H6 numberOfLines={1} style={{color: Color('btnText'), fontStyle: 'italic', fontFamily: 'Poppins-Medium'}}>{data?.product?.title}</H6>
                <Pera style={{ color: Color('gray') }}>{data?.product?.description}</Pera>
            </Pressable>
        );
    }
};

export default SubscriptionCard;
