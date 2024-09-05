import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface Props {
    children: any
}

const KeyboardView = ({children}: Props) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
            {children}
        </KeyboardAvoidingView>
    );
};

export default KeyboardView;
