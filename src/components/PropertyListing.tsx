/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Small, XSmall } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { amountFormat } from '../utils/defaultValues';
import { api, baseUrl, errHandler } from '../API';
import { ArchiveAdd } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const { height, width } = Dimensions.get('window');

const PropertyListing = ({ style, data, onPress }: { style?: any, onPress?: any, data?: any }) => {
    const [ bookmarked, setBookmarked ]: any = useState(null);

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

    return (
        <Pressable onPress={onPress} style={[{ alignSelf: 'center', borderRadius: 10, position: 'relative', backgroundColor: Color('textColor'), padding: width * 0.015 }, style]}>
            <Pressable onPress={markBookmark} style={{ borderRadius: 100, backgroundColor: bookmarked ? Color('btnBackground') : Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.015, top: height * 0.015, right: width * 0.035 }}>
                <ArchiveAdd size="15" color={Color('textColor')} />
            </Pressable>
            <View style={{ left: width * 0.015, backgroundColor: Color('propertyPrice'), position: 'absolute', zIndex: 1, paddingHorizontal: width * 0.05, top: height * 0.02, paddingTop: height * 0.004 }}>
                <XSmall style={{ fontFamily: 'Poppins-SemiBold' }}>${amountFormat(data?.property_value)}</XSmall>
            </View>
            {
                data?.tbl_property_images?.slice(0,1).map((val: any, index: any) => {
                    return (
                        <Image style={{
                            width: width * 0.41,
                            height: height * 0.12,
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
            <View style={{ paddingVertical: height * 0.015 }}>
                <Small numberOfLines={1} style={{ width: width * 0.4, color: Color('btnText'), fontFamily: 'Poppins-SemiBold', textTransform: 'capitalize'  }}>{data?.title}</Small>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <XSmall style={{ color: Color('gray') }}>Type</XSmall>
                    <XSmall style={{ color: Color('gray') }}>|</XSmall>
                    <XSmall style={{ color: Color('gray')}}>{data?.tbl_property_type?.label}</XSmall>
                </View>
                <Br space={0.003} />
                <View style={{
                    flexDirection: 'row',
                    rowGap: 10,
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bed_2.png')} resizeMode="contain" />
                        <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.no_of_bedrooms} Beds</XSmall>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bath_2.png')} resizeMode="contain" />
                        <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.no_of_bathrooms} Baths</XSmall>
                    </View>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/location_2.png')} resizeMode="contain" />
                    <XSmall numberOfLines={1} style={{ fontFamily: 'Jost-Regular', color: Color('gray'), width: width * 0.25 }}>{data?.address}</XSmall>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/size_2.png')} resizeMode="contain" />
                    <XSmall style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>{data?.property_size} Sq</XSmall>
                </View>
            </View>
        </Pressable>
    );
};

export default PropertyListing;
