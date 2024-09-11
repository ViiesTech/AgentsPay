/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Pera, Small, XSmall } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { ArchiveAdd } from 'iconsax-react-native';
import { useNavigation } from '../utils/NavigationContext';
import { api, baseUrl, errHandler } from '../API';
import { amountFormat } from '../utils/defaultValues';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const PropertyCard = ({ data }: { data?: any }) => {
    const { navigate } = useNavigation();
    const [bookmarked, setBookmarked]: any = useState(null);
    useEffect(() => {
        if (data) {
            setBookmarked(data?.is_bookmarked);
        }
    }, [data]);

    const markBookmark = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await api.post('/user/properties/bookmark', {
                id: data?.id,
                isActive: bookmarked ? 1 : 0,
            }, { headers: { Authorization: `Bearer ${token}` } });
            Toast.show(res.data?.title, Toast.SHORT);
            if (bookmarked) {
                setBookmarked(null);
            } else {
                setBookmarked(1);
            }
        } catch (err) {
            await errHandler(err);
        }
    };
    return (
        <Pressable onPress={() => navigate('PropertyDetails', { data: data })} style={{ width: width * 0.85, alignSelf: 'center', position: 'relative' }}>
            <Pressable onPress={markBookmark} style={{ borderRadius: 100, backgroundColor: bookmarked ? Color('btnBackground') : Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.02, top: height * 0.015, right: width * 0.035 }}>
                <ArchiveAdd size="15" color={Color('textColor')} />
            </Pressable>
            <Image style={{
                width: width * 0.85,
                height: height < 650 ? (height * 0.25) : (height * 0.2),
                borderRadius: 20,
                shadowColor: Color('btnText'),
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
            }} source={{ uri: `${baseUrl}/images/properties/${data?.tbl_property_images[0].url}` }} resizeMode="cover" />
            <View style={{ transform: [{ translateY: -(height * 0.05) }], paddingHorizontal: width * 0.03, paddingVertical: height * 0.015, borderRadius: 10, backgroundColor: Color('textColor'), width: width * 0.75, alignSelf: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Pera numberOfLines={1} style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>{data?.title}</Pera>
                    <Pera style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>${amountFormat(data?.property_value)}</Pera>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <XSmall style={{ color: Color('gray') }}>Type</XSmall>
                    <XSmall style={{ color: Color('gray') }}>|</XSmall>
                    <XSmall style={{ color: Color('gray') }}>{data?.tbl_property_type?.label}</XSmall>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/location_2.png')} resizeMode="contain" />
                    <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.address}</Small>
                </View>
                <Br space={0.003} />
                <View style={{
                    flexDirection: 'row',
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
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/size_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.property_size} Sq</Small>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default PropertyCard;
