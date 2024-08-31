/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, PermissionsAndroid, Platform, View } from 'react-native';
import Background from '../utils/Background';
import { H5, Pera } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from '../components/Br';
import { ButtonOutline } from '../components/Button';
import Input from '../components/Input';
import { Edit2 } from 'iconsax-react-native';
import Dropdown from '../components/Dropdown';
import Geolocation from 'react-native-geolocation-service';
import { api, errHandler } from '../API';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const CompleteProfile = ({ navigation }) => {
    const validator = require('validator');

    const [loading, setLoading] = useState(false);
    const [ permissionGranted, setPermissionGranted ] = useState(false);
    const [ profile, setProfile ] = useState({
        gender: 'Gender',
        location: '',
        license_number: '',
        broker_name: '',
    });

    useEffect(() => {
        if (!permissionGranted) {requestLocationPermission();}
    }, [permissionGranted]);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        async (position) => {
                            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&&format=json`)
                            .then(res => res.json())
                            .then(res => {
                                const address = [
                                    res?.address?.road,
                                    res?.address?.city,
                                    res?.address?.state,
                                ];
                                setProfile({...profile, location: address.join(', ')});
                                setPermissionGranted(true);
                            });
                        },
                        (error) => {
                            console.log(error);
                        },
                        {
                            enableHighAccuracy: true,
                            forceRequestLocation: true,
                            forceLocationManager: true,
                        }
                    );
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.log(err);
            }
        } else if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse');
        }
    };

    const isValid = () => {
        if (validator.isEmpty(profile?.gender) || (profile?.gender !== 'male' && profile?.gender !== 'female')) {
            Alert.alert('Gender is required!', 'Please enter your gender.');
            return false;
        }

        if (validator.isEmpty(profile?.location)) {
            Alert.alert('Location is required!', 'Please enter your location.');
            return false;
        }

        if (validator.isEmpty(profile?.license_number)) {
            Alert.alert('License number is required!', 'Please enter your license number.');
            return false;
        }

        if (validator.isEmpty(profile?.broker_name)) {
            Alert.alert('Broker name is required!', 'Please enter your broker name.');
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
                    gender: profile?.gender,
                    location: profile?.location,
                    license_number: profile?.license_number,
                    broker_name: profile?.broker_name,
                }, {headers: {Authorization: `Bearer ${token}`}});

                console.log(res.data);

                Toast.show(res.data?.title, Toast.SHORT);
                // if (res.data?.data?.is_profile_completed) {
                //     navigation.navigate('Home');
                // }else {
                //     navigation.navigate('CompleteProfile');
                // }
            } catch(err) {
                await errHandler(err);
            }
            setLoading(false);
        }
        // navigation.navigate('Subscriptions');
    };

    return (
        <Background>
            <View style={{width: width * 0.85, alignSelf: 'center'}}>
                <Br space={0.1} />
                <H5 theme="light" style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center' }}>Complete your Profile</H5>
                <Pera theme="transparent" style={{ textAlign: 'center' }}>Please enter below details to complete your profile</Pera>
                <Br space={0.03} />
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
                <Br space={0.02} />
                <Dropdown
                    data={[
                        {label: 'Gender', value: ''},
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
