/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native';
import { Color } from '../utils/Colors';
import Background from '../utils/Background';

const { height } = Dimensions.get('window');
const Loading = () => {
    return (
        <Background>
            <View style={{height: height * 0.9, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 70} color={Color('btnBackground')} />
            </View>
        </Background>
    );
};

export default Loading;
