/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Color } from '../utils/Colors';

const { height, width } = Dimensions.get('window');

const Hr = ({style}: {style?: any}) => {
    return (
        <View style={[{borderWidth: 0.5, height: 1, backgroundColor: Color('btnBackground'), borderColor: Color('btnBackground'), marginVertical: height * 0.01, width: width * 0.85}, style]} />
    );
};

export default Hr;
