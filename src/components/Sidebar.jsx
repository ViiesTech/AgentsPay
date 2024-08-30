/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from '../redux/Reducers/drawerSlice';
import { Color } from '../utils/Colors';
import { Call, Card, Cards, Edit2, Home, MessageNotif, Notepad, Personalcard, Profile, Profile2User, ProfileTick, Reserve, SmsNotification } from 'iconsax-react-native';
import { H6, Pera, Small } from '../utils/Text';
import Br from './Br';
import { useNavigation } from '../utils/NavigationContext';
import Backbtn from './Backbtn';
import Hr from './Hr';

const { width, height } = Dimensions.get('screen');

const Sidebar = () => {
    // Create animated value for the horizontal position
    const slideAnim = new Animated.Value(-width);
    const showDrawer = useSelector(({drawer}) => drawer?.drawer);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showDrawer ? 0 : -width, // End position (i.e., slide to the right side)
            duration: 1000, // Duration of the animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [slideAnim, showDrawer]);

    if (!showDrawer) {return;}

    const DrawerItem = ({ label, screen }) => {
        const clicked = () => {
            navigate(screen);
            dispatch(hideDrawer());
        };
        return (
            <>
                <TouchableOpacity onPress={clicked}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: height * 0.015,
                        backgroundColor: Color('btnBackground'),
                        borderRadius: 30,
                        marginBottom: height * 0.01,
                    }}>
                        <Pera style={{fontFamily: 'Poppins-SemiBold'}}>{label}</Pera>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <Animated.View
            style={[
                styles.drawer,
                {
                    transform: [{ translateX: slideAnim }], // Apply the animated value to translateX
                },
            ]}
        >
            <Image source={require('../assets/images/background.png')} style={styles.backgroundImage} />
            <Backbtn style={{ marginLeft: width * 0.03 }} position="static" onPress={() => dispatch(hideDrawer())} />
            <Br space={0.03} />
            <ScrollView>
                <View style={{width: width * 0.9, alignSelf: 'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{flex: 1}}>
                            <View style={{
                                alignItems: 'center',
                                position: 'relative',
                                width: width * 0.25,
                                alignSelf: 'center',
                            }}>
                                <Image source={{ uri: 'https://random.imagecdn.app/500/150' }} resizeMode="cover" style={{
                                    width: width * 0.25,
                                    height: width * 0.25,
                                    borderRadius: 500,
                                    borderWidth: 3,
                                    borderColor: Color('textColor'),
                                }} />
                                <View style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 1,
                                    backgroundColor: Color('btnBackground'),
                                    borderWidth: 3,
                                    borderColor: Color('textColor'),
                                    borderRadius: 100,
                                    padding: width * 0.015,
                                }}>
                                    <Edit2
                                        size="20"
                                        color={Color('textColor')}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <H6>Jacob Brooks</H6>
                            <Hr style={{ width: width * 0.3 }} />
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005}}>
                                <SmsNotification
                                    size="25"
                                    color={Color('btnBackground')}
                                    variant="Outline"
                                />
                                <Small style={{width: width * 0.35}} numberOfLines={1}>jacobbrooks@gmail.com</Small>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005}}>
                                <Call
                                    size="25"
                                    color={Color('btnBackground')}
                                    variant="Outline"
                                />
                                <Small style={{width: width * 0.35}} numberOfLines={1}>234 567 8912</Small>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005}}>
                                <Personalcard
                                    size="25"
                                    color={Color('btnBackground')}
                                    variant="Outline"
                                />
                                <Small style={{width: width * 0.35}} numberOfLines={1}>A2B3C456</Small>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <Notepad
                                    size="25"
                                    color={Color('btnBackground')}
                                    variant="Outline"
                                />
                                <Small style={{width: width * 0.35}} numberOfLines={1}>Keller Williams</Small>
                            </View>
                        </View>
                    </View>
                    <Br space={0.03} />
                    <DrawerItem
                        icon={<Home size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Uploaded Properties"
                        screen="UploadedProperties"
                    />
                    <DrawerItem
                        icon={<Profile size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Add Property"
                        screen="UploadProperty"
                    />
                    <DrawerItem
                        icon={<MessageNotif size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Bookmarks"
                        screen="BookmarkedProperties"
                    />
                    <DrawerItem
                        icon={<Profile2User size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Subscription"
                        screen="MySubscription"
                    />
                    <DrawerItem
                        icon={<Reserve size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Payment Cards"
                        screen="PaymentCards"
                    />
                    <DrawerItem
                        icon={<ProfileTick size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Contact Admin"
                        screen="ContactAdmin"
                    />
                    <DrawerItem
                        icon={<Card size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="User Terms"
                        screen="UserTerms"
                    />
                    <DrawerItem
                        icon={<Cards size="25" color={Color('whiteText')} variant="Bold"/>}
                        label="Privacy Policy"
                        screen="PrivacyPolicy"
                    />
                    <Br space={0.03} />
                    <TouchableOpacity onPress={() => {
                        dispatch(hideDrawer());
                        navigate('Login');
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingVertical: height * 0.015,
                            backgroundColor: Color('textColor'),
                            borderRadius: 30,
                            marginBottom: height * 0.01,
                            width: width * 0.75,
                            alignSelf: 'center',
                        }}>
                            <Pera style={{ fontFamily: 'Poppins-SemiBold', color: Color('btnText') }}>Logout</Pera>
                        </View>
                    </TouchableOpacity>
                    {height < 650 && <Br space={0.08} />}
                </View>
            </ScrollView>
        </Animated.View>
    );
};

export default Sidebar;

const styles = StyleSheet.create({
    drawer: {
        width: width,
        height: height,
        right: 0,
        top: 0,
        position: 'absolute',
        zIndex: 10,
        paddingTop: height * 0.05,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
    },
    userProfilePhoto: {
        borderRadius: 6,
        width: 80,
        height: 80,
    },
});
