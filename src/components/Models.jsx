/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Modal, StatusBar, Dimensions, Pressable } from 'react-native';
import { Color } from '../utils/Colors';

const { width, height } = Dimensions.get('screen');

const Models = ({ children, visible, onClose }) => {
    if (!visible) {
        return <></>;
    }
    return (
        <>
            <StatusBar backgroundColor={Color('modalBackground')} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => onClose(false)}
            >
                <View style={{
                    backgroundColor: Color('modalBackground'),
                    position: 'absolute',
                    height: height,
                    width: width,
                    bottom: 0,
                    left: 0,
                }} />
                <Pressable onPress={() => onClose(false)} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {children}
                </Pressable>
            </Modal>
        </>
    );
};


export default Models;
