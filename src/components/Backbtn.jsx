/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../redux/Reducers/drawerSlice';

const { width } = Dimensions.get('window');
const Backbtn = ({ position, style, onPress, dark, backToSidebar }) => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={style} onPress={() => {
            onPress();
            if (backToSidebar) {
                dispatch(showDrawer());
            }
        }}>
            <Image source={dark ? require('../assets/images/back_btn_dark.png') : require('../assets/images/back_btn.png')}
                style={{
                    width: width * 0.07,
                    height: width * 0.07,
                    position: position || 'absolute',
                    top: 0, left: width * 0.02,
                    zIndex: 1,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default Backbtn;
