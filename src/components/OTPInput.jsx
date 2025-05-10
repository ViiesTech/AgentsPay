/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import OtpTextInput from 'react-native-text-input-otp';
import { Color } from '../utils/Colors';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const OTPInput = ({ inputs, onComplete }) => {
    const [ otp, setOtp ] = useState('');
    useEffect(() => {
        if (otp.length === inputs) {onComplete(otp);}
    }, [otp]);
    return (
        <OtpTextInput
            style={{height: height < 650 ? 50 : 60, borderColor: Color('textColor'), justifyContent: 'center', backgroundColor: Color('textColor')}}
            fontStyle={{color: Color('btnText')}}
            otp={otp}
            setOtp={setOtp}
            digits={inputs}
        />
    );
};

export default OTPInput;
