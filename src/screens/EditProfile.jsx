/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Platform, TouchableOpacity, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import { Edit2 } from 'iconsax-react-native';
import Dropdown from '../components/Dropdown';
import { api, errHandler } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { noImage } from '../utils/defaultValues';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useIsFocused } from '@react-navigation/native';
import Backbtn from '../components/Backbtn';
import Loading from './Loading';
import { ShowAlert } from '../utils/Alert';

const { width, height } = Dimensions.get('window');
const EditProfile = ({ navigation, route }) => {
    const validator = require('validator');
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [ profile, setProfile ] = useState({
        profile_image: noImage,
        gender: '',
        location: '',
        license_number: '',
        broker_name: '',
    });

    useEffect(() => {
        if (isFocused) {loadProfileData();}
    }, [isFocused]);

    const loadProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.get('/user/profile/data', {headers: {Authorization: `Bearer ${token}`}});
            setProfile({
                profile_image: JSON.parse(res.data.data.profile_image),
                gender: res.data.data.gender,
                location: res.data.data.location,
                license_number: res.data.data.license_number,
                broker_name: res.data.data.broker_name,
            });
        } catch(err) {
            await errHandler(err, () => loadProfileData());
        }
    };

    const isValid = () => {
        if (validator.isEmpty(profile?.gender) || (profile?.gender !== 'male' && profile?.gender !== 'female')) {
            ShowAlert('Gender is required!', 'Please enter your gender.');
            return false;
        }

        if (validator.isEmpty(profile?.location)) {
            ShowAlert('Location is required!', 'Please enter your location.');
            return false;
        }

        if (validator.isEmpty(profile?.license_number)) {
            ShowAlert('License number is required!', 'Please enter your license number.');
            return false;
        }

        if (validator.isEmpty(profile?.broker_name)) {
            ShowAlert('Broker name is required!', 'Please enter your broker name.');
            return false;
        }

        return true;
    };

    const onUpdateProfile = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);

            try {
                const token = await AsyncStorage.getItem('token');
                const res = await api.put('/user/profile/update', {
                    gender: profile?.gender.toString(),
                    location: profile?.location.toString(),
                    license_number: profile?.license_number.toString(),
                    broker_name: profile?.broker_name.toString(),
                    profile_image: JSON.stringify(profile.profile_image),
                }, {headers: {Authorization: `Bearer ${token}`}});

                if (route.name === 'EditProfile') {
                    if (Platform.OS === 'android') {
                        Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            gravity: 'center',
                            title: res.data?.title,
                            textBody: res.data?.message,
                            button: 'Okay',
                            onPressButton: () => navigation.replace('Home'),
                            onHide: () => navigation.replace('Home'),
                        });
                    }else {
                        Alert.alert(
                            res.data?.title,
                            res.data?.message, [
                                {text: 'Okay', onPress: () => navigation.replace('Home')},
                            ]
                        );
                    }
                }
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
    };

    const uploadProfileImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            includeBase64: true,
        });

        if (result?.assets) {
            setProfile({...profile, profile_image: {
                uri: result.assets[0].base64,
                prefix: `data:${result.assets[0].type};base64,`,
            }});
        }
    };

    const clickProfileImage = async () => {
        const result = await launchCamera({
            cameraType: 'back',
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            includeBase64: true,
        });

        if (result?.assets) {
            setProfile({...profile, profile_image: {
                uri: result.assets[0].base64,
                prefix: `data:${result.assets[0].type};base64,`,
            }});
        }
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const res = await api.delete('/user/profile/delete', {headers: {Authorization: `Bearer ${token}`}});
            setLoading(false);
            if (route.name === 'EditProfile') {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('fcm');
                await AsyncStorage.removeItem('device');
                await AsyncStorage.removeItem('user');
                if (Platform.OS === 'android') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Okay',
                        onPressButton: () => navigation.navigate('Logout'),
                        onHide: () => navigation.navigate('Logout'),
                    });
                }else {
                    Alert.alert(
                        res.data?.title,
                        res.data?.message, [
                            {text: 'Okay', onPress: () => navigation.navigate('Logout')},
                        ]
                    );
                }
            }
        }catch(err) {
            setLoading(false);
            console.log(err);
        }
    };

    if (profile.license_number === '' || profile.location === '' || profile.gender === '') {
        return <Loading />;
    }

    return (
        <Background>
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
            <Backbtn position="static" onPress={() => navigation.goBack()} />
                <Br space={0.1} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center' }}>Edit Your Profile</H5>
                <Pera theme="transparent" style={{ textAlign: 'center' }}>Please change the details below to edit your profile</Pera>
                <Br space={0.03} />
                <TouchableOpacity style={{
                    alignItems: 'center',
                    position: 'relative',
                    width: width * 0.25,
                    alignSelf: 'center',
                }}
                onPress={() => {
                    Alert.alert(
                        'Select an Option',
                        'Do you want to upload an image or click one from the camera?',
                        [
                            {text: 'Cancel'},
                            {text: 'Camera', onPress: () => clickProfileImage()},
                            {text: 'Upload', onPress: () => uploadProfileImage()},
                        ]
                    );
                }}
                >
                    <Image source={{ uri: `${profile.profile_image?.prefix}${profile.profile_image?.uri}` }} resizeMode="cover" style={{
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
                </TouchableOpacity>
                <Br space={0.02} />
                <Dropdown
                    data={[
                        {label: 'Male', value: 'male'},
                        {label: 'Female', value: 'female'},

                    ]}
                    selectedValue={profile.gender}
                    onValueChange={(value) => setProfile({...profile, gender: value})}
                    style={undefined}
                    defaultStyle={undefined}
                    label={undefined}
                    icon={undefined}
                />
                <Input
                    defaultValue={profile?.location}
                    value={profile?.location}
                    labelText="Location"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, location: value})}
                    isDefaultFocused
                />
                <Input
                    defaultValue={profile?.broker_name}
                    value={profile?.license_number}
                    labelText="Agent License Number"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, license_number: value})}
                />
                <Input
                    defaultValue={profile?.broker_name}
                    value={profile?.broker_name}
                    labelText="Broker Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, broker_name: value})}
                />
                <Br space={0.03} />
                <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={onUpdateProfile}>Update Profile</ButtonOutline>
                <Br space={0.02} />
                <TouchableOpacity onPress={() => Alert.alert('Are You Sure?', 'Please confirm to delete your account.', [
                    {text: 'Cancel', onPress: () => console.log('')},
                    {text: 'Confirm', onPress: () => confirmDelete()},
                ])}>
                    <Pera style={{textAlign: 'center', color: Color('danger')}}>Delete My Account</Pera>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

export default EditProfile;
