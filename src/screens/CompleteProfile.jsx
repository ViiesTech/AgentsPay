/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';
import { noImage } from '../utils/defaultValues';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ShowAlert } from '../utils/Alert';

const { width, height } = Dimensions.get('window');
const CompleteProfile = ({ navigation, route }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [ profile, setProfile ] = useState({
        profile_image: noImage,
        gender: '',
        location: '',
        license_number: '',
        broker_name: '',
    });

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

    const onCompleteProfile = async () => {
        const validation = isValid();

        if (validation) {
            setLoading(true);

            try {
                const token = await AsyncStorage.getItem('token');
                const res = await api.put('/user/profile/complete', {
                    gender: profile?.gender.toString(),
                    location: profile?.location.toString(),
                    license_number: profile?.license_number.toString(),
                    broker_name: profile?.broker_name.toString(),
                    profile_image: JSON.stringify(profile.profile_image),
                }, {headers: {Authorization: `Bearer ${token}`}});

                if (route.name === 'CompleteProfile') {
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        gravity: 'center',
                        title: res.data?.title,
                        textBody: res.data?.message,
                        button: 'Okay',
                        onPressButton: () => navigation.replace('Subscriptions'),
                        onHide: () => navigation.replace('Subscriptions'),
                    });
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

    return (
        <Background>
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Br space={0.1} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center' }}>Complete your Profile</H5>
                <Pera theme="transparent" style={{ textAlign: 'center' }}>Please enter below details to complete your profile</Pera>
                <Br space={0.03} />
                <TouchableOpacity style={{
                    alignItems: 'center',
                    position: 'relative',
                    width: width * 0.25,
                    alignSelf: 'center',
                }}
                onPress={uploadProfileImage}
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
                    value={profile?.location}
                    labelText="Location"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, location: value})}
                />
                <Input
                    value={profile?.license_number}
                    labelText="Agent License Number"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, license_number: value})}
                />
                <Input
                    value={profile?.broker_name}
                    labelText="Broker Name"
                    style={{ marginBottom: height * 0.015 }}
                    onChange={(value) => setProfile({...profile, broker_name: value})}
                />
                <Br space={0.03} />
                <ButtonOutline loading={loading} style={{width: width * 0.85}} onPress={onCompleteProfile}>Submit</ButtonOutline>
                <Br space={0.02} />
            </View>
        </Background>
    );
};

export default CompleteProfile;
