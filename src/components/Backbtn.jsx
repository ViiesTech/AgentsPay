/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const Backbtn = ({ position, style, onPress, dark }) => {
    return (
        <TouchableOpacity style={style} onPress={() => onPress()}>
            <Image source={dark ? require('../assets/images/back_btn_dark.png') : require('../assets/images/back_btn.png')}
                style={{
                    width: width * 0.07,
                    height: width * 0.07,
                    position: position || 'absolute',
                    top: 0, left: width * 0.02,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default Backbtn;
