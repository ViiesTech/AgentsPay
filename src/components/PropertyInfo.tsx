/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import { Pera, Small } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { ArchiveAdd, ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import { useNavigation } from '../utils/NavigationContext';
import { amountFormat } from '../utils/defaultValues';
import { api, baseUrl, errHandler } from '../API';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');
export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const PropertyInfo = ({ data, clickable, isSwiper }: { data?: any, clickable?: boolean, isSwiper?: boolean }) => {
    const { navigate } = useNavigation();
    const [bookmarked, setBookmarked]: any = useState(null);

    useEffect(() => {
        if (data) {
            setBookmarked(data?.is_bookmarked);
        }
    }, [data]);

    const onPress = () => {
        if (clickable) { navigate('PropertyDetails', { data: data }); }
    };
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
        <Pressable onPress={onPress} style={{ width: width * 0.85, alignSelf: 'center', position: 'relative' }}>
            <View style={{ backgroundColor: Color('propertyPrice'), position: 'absolute', zIndex: 1, paddingHorizontal: width * 0.05, top: height * 0.02, paddingTop: height * 0.004 }}>
                <Pera style={{ fontFamily: 'Poppins-SemiBold' }}>${amountFormat(data?.property_value)}</Pera>
            </View>
            <Pressable onPress={markBookmark} style={{ borderRadius: 100, backgroundColor: bookmarked ? Color('btnBackground') : Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.02, top: height * 0.015, right: width * 0.035 }}>
                <ArchiveAdd size="20" color={Color('textColor')} />
            </Pressable>

            {isSwiper
                ?
                <Swiper
                    centerContent
                    showsButtons={isSwiper}
                    style={{
                        height: height * 0.4,
                    }}
                    showsPagination={isSwiper}
                    activeDotColor={Color('btnBackground')}
                    loop={true}
                    buttonWrapperStyle={{
                        backgroundColor: 'transparent',
                        // padding: 10, borderRadius: 10
                    }}

                    nextButton={
                        <View style={{ backgroundColor: 'transparent', transform: [{ translateY: -45 }] }}>
                            <ArrowRight2 size="32" color={Color('btnBackground')} />
                        </View>
                    }
                    prevButton={
                        <View style={{ backgroundColor: 'transparent', transform: [{ translateY: -45 }] }}>
                            <ArrowLeft2
                                size="32"
                                color={Color('btnBackground')}
                            />
                        </View>}
                >
                    {
                        data?.tbl_property_images && data?.tbl_property_images?.length > 0 ? data?.tbl_property_images?.map((val: any, index: any) => {
                            return (
                                <View>
                                    <Image style={{
                                        width: width * 0.85,
                                        height: height * 0.3,
                                        borderRadius: 20,
                                        shadowColor: Color('btnText'),
                                        shadowOffset: {
                                            width: 0,
                                            height: 7,
                                        },
                                        shadowOpacity: 0.41,
                                        shadowRadius: 9.11,

                                    }}
                                        key={index}
                                        source={{ uri: `${baseUrl}/images/properties/${val.url}` }} resizeMode="cover" />
                                </View>
                            );
                        })
                        :
                        <View>
                            <Image style={{
                                width: width * 0.85,
                                height: height * 0.3,
                                borderRadius: 20,
                                shadowColor: Color('btnText'),
                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 0.41,
                                shadowRadius: 9.11,

                            }}
                                source={{ uri: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=' }} resizeMode="cover" />
                        </View>
                    }
                </Swiper>
                :
                <Image style={{
                    width: width * 0.85,
                    height: height * 0.3,
                    borderRadius: 20,
                    shadowColor: Color('btnText'),
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.41,
                    shadowRadius: 9.11,
                }} source={{ uri: data?.tbl_property_images?.length > 0 ? `${baseUrl}/images/properties/${data?.tbl_property_images?.filter((val: any) => val.cover_image === 1)[0]?.url}` : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=' }} resizeMode="cover" />
            }
            <View style={{ paddingHorizontal: width * 0.03, paddingTop: height * 0.02 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Small style={{
                        fontFamily: 'Jost-SemiBold',
                        paddingVertical: height * 0.005,
                        paddingHorizontal: width * 0.06,
                        backgroundColor: Color('btnBackground'),
                        borderRadius: 10,
                    }}>{data?.tbl_property_type?.label}</Small>
                </View>
                <Br space={0.03} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/bed.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>{data?.no_of_bedrooms} Beds</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/bath.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>{data?.no_of_bathrooms} Baths</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/size.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular' }}>{data?.property_size} Sq</Small>
                    </View>
                </View>
                <Br space={0.015} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.06, height: width * 0.06 }} source={require('../assets/images/location.png')} resizeMode="contain" />
                    <Small style={{ fontFamily: 'Jost-Regular' }}>{data?.address}</Small>
                </View>
            </View>
        </Pressable>
    );
};

export default PropertyInfo;
