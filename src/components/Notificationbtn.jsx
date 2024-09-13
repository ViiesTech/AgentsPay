/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '../utils/NavigationContext';

const { width } = Dimensions.get('window');
const Notificationbtn = ({ unSeen, position, onPress, style }) => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity style={style} onPress={() => navigate('Notifications')}>
            <Image source={unSeen ? require('../assets/images/notification_btn_1.png') : require('../assets/images/notification.png')}
                style={{
                    width: width * 0.07,
                    height: width * 0.07,
                    position: position || 'absolute',
                    top: 0, left: !position ? width * 0.02 : 0,
                    zIndex: 1,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default Notificationbtn;
