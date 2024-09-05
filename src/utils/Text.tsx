/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Color } from './Colors';

const { height } = Dimensions.get('window');

interface Props {
    children: any,
    style?: object,
    numberOfLines?: number,
    theme?: string
}

const standardHeight = height < 650 ? 600 : height < 850 ? 700 : 800;

export const H1 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(39, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const H2 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(30, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const H3 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(27, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const H4 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(25, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const H5 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(20, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const H6 = ({theme, children, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(17, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

// PERAGRAPH
export const Pera = ({children, theme, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(12, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const Small = ({children, theme, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(10, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};

export const XSmall = ({children, theme, numberOfLines, style}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: theme && theme === 'light' ? Color('btnBackground') : theme === 'dark' ? Color('darkTheme') : theme === 'transparent' ? Color('textLight') : Color('textColor'), fontSize: RFValue(8, standardHeight), fontFamily: 'Poppins-Regular' }, style]}>{children}</Text>
    );
};
