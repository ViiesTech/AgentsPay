/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { hideDrawer } from '../redux/Reducers/drawerSlice';
import { Color } from '../utils/Colors';
import { Call, Card, Cards, Edit2, Hashtag, Home, MessageNotif, Notepad, Personalcard, Profile, Profile2User, ProfileTick, Reserve, SmsNotification, User } from 'iconsax-react-native';
import { H6, Pera, Small } from '../utils/Text';
import Br from './Br';
import Backbtn from './Backbtn';
import Hr from './Hr';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../API';
import Models from './Models';
import QRCode from 'react-native-qrcode-svg';
const { width, height } = Dimensions.get('screen');

const Sidebar = ({ user, isOpen }) => {
    // Create animated value for the horizontal position
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [slideAnim] = useState(new Animated.Value(-width));
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState();
    const [genderPronouns, setGenderPronouns] = useState('');
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [qrCodeData, setQRCodeData] = useState('');

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isOpen ? 0 : -width,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim, isOpen]);

    useEffect(() => {
        if (!userData) { saveUserData(); }
    }, []);

    const saveUserData = async () => {
        if (user) {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/profile/data', { headers: { Authorization: `Bearer ${token}` } });
            setGenderPronouns(res.data?.data?.gender);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUserData(user);
        } else {
            const savedData = await AsyncStorage.getItem('user');
            setUserData(JSON.parse(savedData));
        }
    };
    const DrawerItem = ({ label, screen }) => {
        const clicked = () => {
            navigation.navigate(screen, { backToSidebar: true });
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
                        <Pera style={{ fontFamily: 'Poppins-SemiBold' }}>{label}</Pera>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    const qrOpen = () => {
        setVisible(true);
        const url = 'https://play.google.com/store/apps/details?id=com.example.yourapp';
    }

    if (!isOpen || !userData) { return; }

    return (
        <>
            <Models visible={visible} onClose={setVisible}>
                <View style={{ alignItems: 'center', padding: height * 0.02, borderRadius: height * 0.01, width: width * 0.8, backgroundColor: Color('textColor') }}>
                    <Pera style={{ color: Color('btnText'), fontWeight: 'bold', textAlign: 'center' }}>Referral Code</Pera>
                    <Br space={0.01} />
                    {userData && userData?.referral_code &&
                        <View>
                            <QRCode
                                value={qrCodeData}
                                size={200}
                                logoBackgroundColor="white"
                                logoSize={40}
                                logoMargin={2}
                            />
                         </View>
                    }
                </View>
            </Models>
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: width * 0.9, alignSelf: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{ flex: 1 }}>
                                <Pressable onPress={() => {
                                    dispatch(hideDrawer());
                                    navigation.navigate('EditProfile');
                                }} style={{
                                    alignItems: 'center',
                                    position: 'relative',
                                    width: width * 0.25,
                                    alignSelf: 'center',
                                }}>
                                    <Image source={{ uri: userData ? `${JSON.parse(userData?.profile_image).prefix}${JSON.parse(userData?.profile_image).uri}` : 'https://random.imagecdn.app/500/150' }} resizeMode="cover" style={{
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
                                </Pressable>
                                <TouchableOpacity onPress={qrOpen}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        paddingVertical: height * 0.005,
                                        backgroundColor: Color('btnBackground'),
                                        borderRadius: 30,
                                        width: width * 0.3,
                                        alignSelf: 'center',
                                        marginTop: height * 0.03,
                                    }}>
                                        <Pera style={{ fontFamily: 'Poppins-SemiBold' }}>Generate QR</Pera>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <H6 style={{ textTransform: 'capitalize' }} numberOfLines={1}>{userData?.full_name}</H6>
                                <Hr style={{ width: width * 0.3 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005 }}>
                                    <SmsNotification
                                        size="25"
                                        color={Color('btnBackground')}
                                        variant="Outline"
                                    />
                                    <Small style={{ width: width * 0.35 }} numberOfLines={1}>{userData?.email}</Small>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005 }}>
                                    <Call
                                        size="25"
                                        color={Color('btnBackground')}
                                        variant="Outline"
                                    />
                                    <Small style={{ width: width * 0.35 }} numberOfLines={1}>{userData?.phone}</Small>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005 }}>
                                    <Personalcard
                                        size="25"
                                        color={Color('btnBackground')}
                                        variant="Outline"
                                    />
                                    <Small style={{ width: width * 0.35 }} numberOfLines={1}>{userData?.license_number}</Small>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: height * 0.005 }}>
                                    <Notepad
                                        size="25"
                                        color={Color('btnBackground')}
                                        variant="Outline"
                                    />
                                    <Small style={{ width: width * 0.35 }} numberOfLines={1}>{userData?.broker_name}</Small>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Hashtag
                                        size="22"
                                        color={Color('btnBackground')}
                                        variant="Outline"
                                    />
                                    <Small style={{ width: width * 0.45 }} numberOfLines={1}>{genderPronouns === 'male' ? 'He' : genderPronouns === 'female' ? 'She' : 'Other'}</Small>
                                </View>
                            </View>
                        </View>
                        <Br space={0.03} />
                        <DrawerItem
                            icon={<Home size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Uploaded Properties"
                            screen="UploadedProperties"
                        />
                         <DrawerItem
                            icon={<Home size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Inbox"
                            screen="Inbox"
                        />
                        <DrawerItem
                            icon={<Profile size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Add Property"
                            screen="UploadProperty"
                        />
                        <DrawerItem
                            icon={<MessageNotif size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Bookmarks"
                            screen="BookmarkedProperties"
                        />
                        <DrawerItem
                            icon={<Profile2User size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Subscription"
                            screen="MySubscription"
                        />
                        <DrawerItem
                            icon={<Reserve size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Payment Cards"
                            screen="PaymentCards"
                        />
                        <DrawerItem
                            icon={<ProfileTick size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Contact Admin"
                            screen="ContactAdmin"
                        />
                        <DrawerItem
                            icon={<Card size="25" color={Color('whiteText')} variant="Bold" />}
                            label="User Terms"
                            screen="UserTerms"
                        />
                        <DrawerItem
                            icon={<Cards size="25" color={Color('whiteText')} variant="Bold" />}
                            label="Privacy Policy"
                            screen="PrivacyPolicy"
                        />
                        <Br space={0.03} />
                        <TouchableOpacity onPress={async () => {
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('fcm');
                            await AsyncStorage.removeItem('device');
                            await AsyncStorage.removeItem('user');
                            dispatch(hideDrawer());
                            navigation.navigate('Logout');
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
                        <Br space={0.08} />
                    </View>
                </ScrollView>
            </Animated.View>
        </>
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
