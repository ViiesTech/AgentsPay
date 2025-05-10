/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Color } from '../utils/Colors';

const { width, height } = Dimensions.get('window');

interface Props {
    children: any,
    style?: object,
    fontSize?: number,
    onPress: any,
    icon?: any,
    loading?: boolean,
    color?: any,
    textStyle?: any
}

const Loading = ({color}: {color?: any}) => {
    return <ActivityIndicator color={color || Color('btnText')} />;
};

export const Button = ({loading, children, style, fontSize, onPress, color, textStyle}: Props) => {
    return (
        <TouchableOpacity disabled={loading} onPress={() => onPress()} style={[styles.btn, style]}>
            {
                loading
                ?
                <Loading />
                :
                <Text style={{ fontSize: RFValue(fontSize || 16, height), color: color || Color('textColor'), textAlign: 'center', fontFamily: 'Poppins-SemiBold', ...textStyle }}>{children}</Text>
            }
        </TouchableOpacity>
    );
};

export const ButtonOutline = ({loading, children, style, fontSize, onPress, color, textStyle}: Props) => {
    return (
        <TouchableOpacity disabled={loading} onPress={() => onPress()} style={[styles.btnOutline, style]}>
            {
                loading
                ?
                <Loading />
                :
                <Text style={{ fontSize: RFValue(fontSize || 16, height), color: color || Color('btnText'), textAlign: 'center', fontFamily: 'Poppins-SemiBold', ...textStyle }}>{children}</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Color('btnBackground'),
        borderRadius: 30,
        paddingTop: height * 0.015,
        paddingBottom: height * 0.012,
        paddingHorizontal: width * 0.1,
    },
    btnOutline: {
        backgroundColor: Color('textColor'),
        borderRadius: 30,
        paddingTop: height * 0.015,
        paddingBottom: height * 0.012,
        paddingHorizontal: width * 0.1,
    },
});
