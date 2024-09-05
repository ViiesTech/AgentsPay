/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, TextInput, View } from 'react-native';
import { Color } from '../utils/Colors';
import { Pera, XSmall } from '../utils/Text';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

interface Props {
    labelText?: string,
    style?: object,
    numberOfLines?: number,
    onChange?: any,
    value?: any,
    onBlur?: any,
    defaultValue?: any,
    secure?: boolean,
    isDefaultFocused?: boolean,
    keyboardType?: any
}
const inputHeight = Platform.OS === 'ios' ? 60 : height * 0.05;

const Input = ({secure, defaultValue, onBlur, labelText, style, numberOfLines, onChange, value, isDefaultFocused, keyboardType, ...props}: Props) => {
    const [ isFocused, setIsFocused ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');
    const halfHeight = inputHeight / 20;
    const labelMovement = useRef(new Animated.Value(halfHeight)).current;

    useEffect(() => {
        if ((defaultValue && defaultValue.length > 0) || isDefaultFocused) {
            focused();
        }
    }, [defaultValue, isDefaultFocused]);

    const focused = () => {
        Animated.timing(labelMovement, {
            toValue: -(height * 0.015),
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsFocused(true);
    };

    const unFocused = () => {
        if (inputValue.length === 0) {
            Animated.timing(labelMovement, {
                toValue: halfHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setIsFocused(false);
        }
        if (onBlur) {onBlur();}
    };

    const onChangeHandler = (value: any) => {
        setInputValue(value);
        onChange(value);
    };

    return (
        <>
            <View style={[styles.input, style, { alignItems: 'center' }]}>
                <Animated.View style={{
                    position: 'absolute',
                    left: width * 0.02,
                    transform: [{ translateY: labelMovement }],
                    zIndex: 0,
                }}>
                    {
                        isFocused
                        ?
                        <XSmall style={{
                            color: Color('textLight'),
                            fontFamily: 'Poppins-Regular',
                        }}>{labelText}</XSmall>
                        :
                        <Pera style={{
                            color: Color('textLight'),
                            fontFamily: 'Poppins-Regular',
                        }}>{labelText}</Pera>
                    }
                </Animated.View>
                <TextInput {...props} keyboardType={keyboardType} secureTextEntry={secure} onFocus={focused} defaultValue={defaultValue} onBlur={unFocused} value={value} onChangeText={onChangeHandler} multiline={numberOfLines && numberOfLines > 0 ? true : false} numberOfLines={numberOfLines} style={[styles.field, {color: Color('textColor'), textAlignVertical: numberOfLines && numberOfLines > 0 ? 'top' : 'center'}]} />
            </View>
        </>
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        borderColor: Color('btnOutline'),
        borderBottomWidth: 1,
        paddingHorizontal: width * 0.04,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
    },
    field: {
        flex: 1,
        paddingTop: height * 0.03,
        paddingBottom: height < 650 ? 0 : height * 0.003,
        minHeight: inputHeight,
        fontSize: RFValue(17, height),
    },
});
