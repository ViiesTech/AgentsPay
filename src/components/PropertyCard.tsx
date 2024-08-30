/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Pera, Small, XSmall } from '../utils/Text';
import { Color } from '../utils/Colors';
import Br from './Br';
import { Book1 } from 'iconsax-react-native';
import { useNavigation } from '../utils/NavigationContext';

const { height, width } = Dimensions.get('window');

const PropertyCard = () => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate('PropertyDetails')} style={{ width: width * 0.85, alignSelf: 'center', position: 'relative' }}>
            <View style={{ borderRadius: 100, backgroundColor: Color('gray'), position: 'absolute', zIndex: 1, padding: width * 0.02, top: height * 0.015, right: width * 0.035 }}>
                <Book1 size="15" color={Color('textColor')} />
            </View>
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
            }} source={{ uri: 'https://www.investopedia.com/thmb/bfHtdFUQrl7jJ_z-utfh8w1TMNA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/houses_and_land-5bfc3326c9e77c0051812eb3.jpg' }} resizeMode="cover" />
            <View style={{ transform: [{translateY: -(height * 0.05)}], paddingHorizontal: width * 0.03, paddingVertical: height * 0.015, borderRadius: 10, backgroundColor: Color('textColor'), width: width * 0.75, alignSelf: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Pera numberOfLines={1} style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>Regal Ridge Estates</Pera>
                    <Pera style={{ color: Color('btnText'), fontFamily: 'Poppins-SemiBold' }}>$ 150K</Pera>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}>
                    <XSmall style={{ color: Color('gray') }}>Type</XSmall>
                    <XSmall style={{ color: Color('gray') }}>|</XSmall>
                    <XSmall style={{ color: Color('gray') }}>Penthouse</XSmall>
                </View>
                <Br space={0.005} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/location_2.png')} resizeMode="contain" />
                    <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>39 West Street Johannesburg, 2198, SA</Small>
                </View>
                <Br space={0.003} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bed_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>4 Beds</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/bath_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>4 Baths</Small>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: width * 0.04, height: width * 0.04 }} source={require('../assets/images/size_2.png')} resizeMode="contain" />
                        <Small style={{ fontFamily: 'Jost-Regular', color: Color('gray') }}>1642 Sq</Small>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PropertyCard;
