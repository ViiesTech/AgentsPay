/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { amountFormat } from '../utils/defaultValues';
import { api, baseUrl, errHandler } from '../API';
import { ArchiveAdd } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { Button } from './Button';
import { useNavigation } from '../utils/NavigationContext';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { height, width } = Dimensions.get('window');

const PropertyListing = ({ route, routeShouldBe, isBookmarked, own, style, data, onPress }: { own?: boolean, style?: any, onPress?: any, data?: any, isBookmarked?: any, route?: any, routeShouldBe?: any }) => {
    const [ bookmarked, setBookmarked ]: any = useState(null);
    const [ deleted, setDeleted ]: any = useState(false);
    const { navigate } = useNavigation();

    useEffect(() => {
        if (data) {
            if (data?.is_bookmarked === undefined) {
                setBookmarked(isBookmarked);
            }else {
                setBookmarked(data?.is_bookmarked);
            }
        }
    }, [data, isBookmarked]);

    const markBookmark = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.post('/user/properties/bookmark', {
                id: data?.id,
                isActive: bookmarked ? 1 : 0,
            }, {headers: {Authorization: `Bearer ${token}`}});
            Toast.show(res.data?.title, Toast.SHORT);
            if (bookmarked) {
                setBookmarked(null);
            }else {
                setBookmarked(1);
            }
        } catch(err) {
            await errHandler(err);
        }
    };

    const del = () => {
        if (route.name === routeShouldBe) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Confirm To Delete?',
                textBody: 'Please confirm to delete the property.',
                button: 'Confirm',
                onPressButton: async () => await deleteProperty(),
            });
        }
    };

    const deleteProperty = async () => {
        try {
            Dialog.hide();
            Toast.show('Deleting....', Toast.SHORT);
            const token = await AsyncStorage.getItem('token');
            const res = await api.delete('/user/properties/delete?id=' + data?.id, {headers: {Authorization: `Bearer ${token}`}});
            Toast.show(res.data?.title, Toast.SHORT);
            setDeleted(true);
        } catch(err) {
            await errHandler(err);
        }
    };

    if (deleted) {
        return false;
    }

    return (
        <Pressable onPress={onPress} style={[{ alignSelf: 'center', borderRadius: 10, position: 'relative', backgroundColor: Color('textColor'), padding: width * 0.015 }, style]}>
            <Pressable onPress={markBookmark} style={{ borderRadius: 100, backgroundColor: bookmarked ? Color('btnBackground') : Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.015, top: height * 0.015, right: width * 0.035 }}>
                <ArchiveAdd size="15" color={Color('textColor')} />
            </Pressable>
            <View style={{ left: width * 0.015, backgroundColor: Color('propertyPrice'), position: 'absolute', zIndex: 1, paddingHorizontal: width * 0.05, top: height * 0.02, paddingTop: height * 0.004 }}>
                <Small style={{ fontFamily: 'Poppins-SemiBold' }}>${amountFormat(data?.property_value)}</Small>
            </View>
            {
                data?.tbl_property_images?.slice(0,1).map((val: any, index: any) => {
                    return (
                        <Image style={{
                            width: width * 0.41,
                            height: height * 0.13,
                            borderRadius: 10,
                            shadowColor: Color('btnText'),
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 0.41,
                            shadowRadius: 9.11,
                        }} key={index} source={{ uri: `${baseUrl}/images/properties/${val.url}` }} resizeMode="cover" />
                    );
                })
            }
            <View style={{ paddingTop: height * 0.015, paddingBottom: own ? 0 : height * 0.015 }}>
                <Pera numberOfLines={1} style={{ width: width * 0.4, color: Color('btnText'), fontFamily: 'Poppins-SemiBold', textTransform: 'capitalize'  }}>{data?.title}</Pera>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <Small style={{ color: Color('gray') }}>Type</Small>
                    <Small style={{ color: Color('gray') }}>|</Small>
                    <Small style={{ color: Color('gray')}}>{data?.tbl_property_type?.label}</Small>
                </View>
                <Br space={0.003} />
                <View style={{
                    flexDirection: 'row',
                    rowGap: 10,
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bed_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.no_of_bedrooms} Beds</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bath_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.no_of_bathrooms} Baths</Small>
                    </View>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/location_2.png')} resizeMode="contain" />
                    <Small numberOfLines={1} style={{ fontFamily: 'Jost-Regular', color: Color('gray'), width: width * 0.28 }}>{data?.address}</Small>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/size_2.png')} resizeMode="contain" />
                    <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.property_size} Sq</Small>
                </View>
                {
                    own && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: height * 0.01 }}>
                            <Button style={{ flex: 1, borderRadius: 10, paddingTop: height * 0.005, paddingBottom: height * 0.003, paddingHorizontal: width * 0.03 }} fontSize={12} onPress={() => navigate('EditProperty', {id: data.id})}>Edit</Button>
                            <Button style={{ flex: 1, borderRadius: 10, paddingTop: height * 0.005, paddingBottom: height * 0.003, paddingHorizontal: width * 0.03 }} fontSize={12} onPress={del}>Delete</Button>
                        </View>
                    )
                }
            </View>
        </Pressable>
    );
};

export default PropertyListing;
